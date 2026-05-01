'use client';

import { motion } from 'framer-motion';
import generateQRCode from '@/utils/qr-generate';

const EASE = [0.16, 1, 0.3, 1] as const;

type Social = {
  label: string;
  handle: string;
  url: string;
  icon: string;
  accent: 'emerald' | 'azure' | 'violet' | 'amber';
};

const ACCENTS: Record<Social['accent'], { color: string; rgb: string }> = {
  emerald: { color: '#22c55e', rgb: '34, 197, 94' },
  azure: { color: '#3b82f6', rgb: '59, 130, 246' },
  violet: { color: '#a78bfa', rgb: '167, 139, 250' },
  amber: { color: '#f59e0b', rgb: '245, 158, 11' },
};

const socials: Social[] = [
  {
    label: 'LinkedIn',
    handle: 'in/tanakrit-karaket',
    url: 'https://www.linkedin.com/in/tanakrit-karaket-a56033130/',
    icon: '/images/linkedin.png',
    accent: 'azure',
  },
  {
    label: 'Facebook',
    handle: 'famfam452',
    url: 'https://www.facebook.com/famfam452/',
    icon: '/images/facebook.png',
    accent: 'azure',
  },
  {
    label: 'Instagram',
    handle: '@famfam452',
    url: 'https://www.instagram.com/famfam452/',
    icon: '/images/instagram.png',
    accent: 'violet',
  },
  {
    label: 'GitHub',
    handle: 'famfam452',
    url: 'https://github.com/famfam452',
    icon: '/images/github.png',
    accent: 'emerald',
  },
];

const Contact = () => {
  return (
    <div className="relative flex min-h-screen flex-col px-6 pt-20 pb-32 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="font-mono mb-6 text-[10px] tracking-[0.4em] text-white/40"
      >
        CHAPTER 03 · OPEN A CHANNEL
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
        className="font-display max-w-4xl text-5xl leading-[0.95] font-light md:text-7xl lg:text-8xl"
      >
        Say
        <br />
        <span className="italic text-white/60">hello</span>
        <span className="relative ml-3 inline-block">
          .
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
            className="from-emerald-glow to-azure-glow absolute -bottom-2 left-0 right-0 h-px origin-left bg-linear-to-r via-white/40"
          />
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-8 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg"
      >
        Inquiries, collaborations, or a quiet chat about software, decisions, or whatever else. Pick
        the channel you prefer.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
        className="mt-12 max-w-2xl"
      >
        <div className="font-mono mb-3 text-[10px] tracking-[0.3em] text-white/40">01 · DIRECT</div>
        <a
          href="mailto:tanakritgaraket@gmail.com"
          className="group bg-ink-700/40 inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/4"
        >
          <span className="bg-emerald-glow h-2 w-2 rounded-full shadow-[0_0_8px_#22c55e]" />
          <span className="font-mono text-sm tracking-wider text-white/85">
            tanakritgaraket@gmail.com
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 transition group-hover:text-white/60">
            ↗ MAIL
          </span>
        </a>
      </motion.div>

      <div className="mt-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="font-mono mb-6 text-[10px] tracking-[0.3em] text-white/40"
        >
          02 · SOCIAL
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map(({ label, handle, url, icon, accent }, i) => {
            const { color, rgb } = ACCENTS[accent];
            return (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.25 + i * 0.12,
                  duration: 0.7,
                  ease: EASE,
                }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border p-5"
                style={{
                  background: `linear-gradient(135deg, rgba(${rgb}, 0.08), transparent 70%)`,
                  borderColor: `rgba(${rgb}, 0.18)`,
                }}
              >
                <div
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-25 blur-3xl"
                  style={{ background: color }}
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="font-display mt-1 text-lg italic text-white/95">{label}</div>
                    <div className="font-mono mt-1 text-[11px] tracking-wider text-white/45">
                      {handle}
                    </div>
                  </div>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: color,
                      boxShadow: `0 0 8px ${color}`,
                    }}
                  />
                </div>

                <div className="relative mt-5 overflow-hidden rounded-xl border border-white/10 bg-white/3 p-3">
                  {generateQRCode(url, { iconSrc: icon, size: 160 })}
                </div>

                <div className="font-mono relative mt-4 flex items-center justify-between text-[10px] tracking-[0.2em] text-white/35 transition group-hover:text-white/70">
                  <span>SCAN OR TAP</span>
                  <span>↗</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-24 flex flex-col gap-3 border-t border-white/4 pt-8 md:flex-row md:justify-between"
      >
        <div className="font-mono text-[10px] tracking-wider text-white/30">
          PRESENTATION · CONTACT · v1.0
        </div>
        <div className="font-display text-xs italic text-white/40">
          &ldquo;The best signal is the one you actually answer.&rdquo;
        </div>
      </motion.footer>
    </div>
  );
};

export default Contact;
