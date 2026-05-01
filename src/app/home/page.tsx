'use client';

import { motion } from 'framer-motion';
import DiagramCarousel from '@/components/carousel/diagram-carousel';
import DiagramOne from './components/diagram-1';
import DiagramTwo from './components/diagram-2';
import DiagramThree from './components/diagram-3';
import DiagramTemplate from './components/diagram-template';
import GifCard from '@/components/cards/gif-card';
import ImageSlide from './components/image-slide';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="px-6 pt-20 pb-6 md:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-mono mb-6 text-[10px] tracking-[0.4em] text-white/40"
        >
          CHAPTER 01 · A SLIDE-BY-SLIDE LOOK
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="font-display max-w-5xl text-4xl leading-[0.95] font-light md:text-6xl lg:text-7xl"
        >
          Diagrams,
          <br />
          <span className="italic text-white/60">side</span> by{' '}
          <span className="relative inline-block">
            side
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
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/55"
        >
          Drag, click, or just hover toward the edges. Each slide is one frame of the same story.
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
        className="flex flex-1 items-center"
      >
        <DiagramCarousel>
          <DiagramOne />
          <DiagramTemplate>
            <GifCard src="/gif/aq8fnu.gif" className="w-2xl aspect-square" />
          </DiagramTemplate>
          <DiagramTwo />
          <DiagramTemplate>
            <ImageSlide src="/images/car-direction-meme-1.png" className="w-2xl aspect-square" />
          </DiagramTemplate>
          <DiagramThree />
          <DiagramTemplate>
            <GifCard src="/gif/internship-scene.gif" className="w-2xl aspect-video" />
          </DiagramTemplate>
          <DiagramTemplate>
            <ImageSlide src="/graphic/image_6.png" className="h-120 w-200" />
          </DiagramTemplate>
          <DiagramTemplate>
            <ImageSlide src="/images/terminator-anime-meme-1.png" className="h-136.25 w-125" />
          </DiagramTemplate>
          <DiagramTemplate>
            <ImageSlide src="/images/pikachu-meme-1.png" className="h-125 w-125" />
          </DiagramTemplate>
        </DiagramCarousel>
      </motion.div>
    </div>
  );
}
