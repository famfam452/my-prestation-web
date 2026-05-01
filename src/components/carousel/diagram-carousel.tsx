'use client';

import { useState, ReactNode } from 'react';

interface DiagramCarouselProps {
  children: ReactNode[];
}

const WINDOW_SIZE = 3;

export default function DiagramCarousel({ children }: DiagramCarouselProps) {
  const slides = Array.isArray(children) ? children : [children];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const half = Math.floor(WINDOW_SIZE / 2);
  const maxStart = Math.max(0, slides.length - WINDOW_SIZE);
  const windowStart = Math.min(maxStart, Math.max(0, currentIndex - half));
  const windowIndices = Array.from(
    { length: Math.min(WINDOW_SIZE, slides.length) },
    (_, i) => windowStart + i
  );

  return (
    <div className="group/carousel flex min-h-screen w-full flex-col gap-6 px-6 md:px-20">
      <div className="relative flex w-full flex-1 items-center justify-center">
        {slides[currentIndex]}

        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute inset-y-0 left-0 z-10 flex w-1/2 cursor-w-resize items-center justify-start pl-4 opacity-0 transition-opacity duration-200 group-hover/carousel:opacity-100 focus:opacity-100 focus:outline-none"
        >
          <span
            aria-hidden
            className="bg-ink-700/70 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-2xl font-light text-white/85 shadow-lg backdrop-blur-md"
          >
            ‹
          </span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute inset-y-0 right-0 z-10 flex w-1/2 cursor-e-resize items-center justify-end pr-4 opacity-0 transition-opacity duration-200 group-hover/carousel:opacity-100 focus:opacity-100 focus:outline-none"
        >
          <span
            aria-hidden
            className="bg-ink-700/70 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-2xl font-light text-white/85 shadow-lg backdrop-blur-md"
          >
            ›
          </span>
        </button>
      </div>

      <div className="sticky bottom-0 left-0 right-0 flex flex-col items-center gap-3 px-6 py-6 opacity-0 transition-opacity duration-200 group-hover/carousel:opacity-100 focus-within:opacity-100">
        <div className="bg-ink-800/60 flex items-center gap-1 rounded-full border border-white/10 p-1.5 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="font-mono flex h-7 w-7 items-center justify-center rounded-full text-base text-white/55 transition hover:bg-white/5 hover:text-white/90"
          >
            ‹
          </button>

          {windowIndices.map((index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`font-mono rounded-full px-3.5 py-1.5 text-[11px] tracking-[0.2em] transition ${
                index === currentIndex
                  ? 'bg-white/85 text-black'
                  : 'text-white/55 hover:bg-white/5 hover:text-white/85'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="font-mono flex h-7 w-7 items-center justify-center rounded-full text-base text-white/55 transition hover:bg-white/5 hover:text-white/90"
          >
            ›
          </button>
        </div>

        <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">
          {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
