import { useState, useEffect, useCallback } from 'react';
import type { CarouselSlide } from '../types';

export interface HomeBannerCarouselProps {
  slides: CarouselSlide[];
  autoSlideInterval?: number;
}

export function HomeBannerCarousel({
  slides,
  autoSlideInterval = 5500,
}: HomeBannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (total || 1));
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % (total || 1));
  }, [total]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(timer);
  }, [isPaused, total, autoSlideInterval, nextSlide]);

  if (total === 0) return null;
  const current = slides[currentIndex];

  return (
    <div
      className="relative h-[480px] w-full overflow-hidden rounded-3xl shadow-xl lg:h-[540px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Hình ảnh khám phá Quảng Trị"
    >
      {/* Background Images with smooth crossfade */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="h-full w-full object-cover object-center transform scale-105 duration-10000 transition-transform"
          />
        </div>
      ))}

      {/* Layer Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/60 sm:to-transparent" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:justify-center lg:max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 px-3.5 py-1 text-xs font-semibold text-primary-light text-white mb-3 w-fit">
          <span>★</span>
          <span>{current.badge}</span>
          <span>•</span>
          <span>{current.location}</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-md">
          KHÁM PHÁ QUẢNG TRỊ
        </h1>

        <p className="mt-2 text-base font-semibold text-primary-light sm:text-lg">
          {current.title}
        </p>

        <p className="mt-1 text-sm text-neutral-200 line-clamp-2 sm:line-clamp-none">
          {current.subtitle}
        </p>

        <p className="mt-4 text-xs italic text-neutral-300">
          "Về miền di sản – Khám phá thiên nhiên – Trải nghiệm những hành trình đáng nhớ."
        </p>
      </div>

      {/* Arrows (Left / Right) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Ảnh trước"
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ink/40 text-white backdrop-blur-md hover:bg-primary transition-colors cursor-pointer border border-white/20"
      >
        ❮
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Ảnh kế tiếp"
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ink/40 text-white backdrop-blur-md hover:bg-primary transition-colors cursor-pointer border border-white/20"
      >
        ❯
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-ink/40 backdrop-blur-md px-3 py-1.5 border border-white/10">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Chuyển đến slide ${slide.title}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
