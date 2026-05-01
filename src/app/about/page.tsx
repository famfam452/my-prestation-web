'use client';

import { motion } from 'framer-motion';
import ImageCards from '@/components/cards/carousel-image-cards';
import { InformationCard } from '@/components/cards/information-card';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <div className="relative flex min-h-screen flex-col px-6 pt-20 pb-32 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="font-mono mb-6 text-[10px] tracking-[0.4em] text-white/40"
      >
        CHAPTER 02 · A SHORT BIOGRAPHY
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
        className="font-display max-w-4xl text-5xl leading-[0.95] font-light md:text-7xl lg:text-8xl"
      >
        Who is
        <br />
        <span className="italic text-white/60">this </span>{' '}
        <span className="relative inline-block">
          guy?
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
            className="from-emerald-glow to-azure-glow absolute -bottom-2 left-0 right-0 h-px origin-left bg-linear-to-r via-white/40"
          />
        </span>
        .
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-8 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg"
      >
        A short ledger — where I&apos;m from, where I studied, and the path that led to writing
        software for a living.
      </motion.p>

      <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-[auto_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
          className="flex flex-col items-start gap-3"
        >
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">01 · PORTRAITS</div>
          <ImageCards />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">
            02 · THE LEDGER
          </div>
          <InformationCard
            title="About me, roughly."
            description="My name is Tanakrit — call me Fam."
            information={[
              'Year of birth · 1998 (≈ 27–28)',
              'Hometown · Surin, Prasat',
              'High school · Prasatwittayakarn (PWK)',
              'Bachelor · Information Engineering, KMITL',
              'Role · Software Engineer',
              'J Summer Camp · 2016',
            ]}
          />
        </motion.div>
      </div>
    </div>
  );
}
