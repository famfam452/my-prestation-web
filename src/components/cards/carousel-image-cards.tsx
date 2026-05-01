'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageCards() {
  const images = [
    '/images/pers_1.jpg',
    '/images/pers_2.jpg',
    '/images/pers_3.jpg',
    '/images/pers_4.jpg',
    '/images/pers_5.jpg',
    '/images/pers_7.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="card-container w-3xs relative shadow-2xl shrink-0 rounded-[12.1241px] overflow-hidden"
      style={{ height: '16rem' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={images[currentIndex]}
        alt="Image Card"
        sizes="256px"
        fill
        className="object-cover rounded-[12.1241px]"
      />

      <button
        onClick={prevImage}
        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Previous image"
      >
        ‹
      </button>

      <button
        onClick={nextImage}
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Next image"
      >
        ›
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
