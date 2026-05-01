# syntax=docker/dockerfile:1.7

# ---------- deps: install only production-relevant deps for caching ----------
FROM node:22-alpine AS deps
WORKDIR /app

# libc6-compat is the documented requirement for Next.js on Alpine
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---------- builder: compile Next.js in standalone mode ----------
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ---------- runner: minimal image with the standalone output ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as non-root
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Static assets and public files have to be copied alongside the standalone server.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
