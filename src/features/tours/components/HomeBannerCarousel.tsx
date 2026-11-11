import { useState, useEffect, useCallback } from 'react';
import type { CarouselSlide } from '../types';

export interface HomeBannerCarouselProps {
  slides: CarouselSlide[];
  autoSlideInterval?: number;
}

const arrowClass =
  'flex h-11 w-11 items-center justify-center rounded-full border border-on-media/25 bg-on-media/10 text-on-media backdrop-blur-md transition-all hover:border-primary hover:bg-primary cursor-pointer';

const pad = (n: number) => String(n).padStart(2, '0');

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

  if (total === 0) {
    // Khung chờ (skeleton) đúng kích thước banner để trang không bị giật khi dữ liệu về
    return <div className="h-[460px] w-full animate-pulse rounded-[28px] bg-surface-alt sm:h-[520px] lg:h-[560px]" aria-hidden="true" />;
  }
  const current = slides[currentIndex];

  return (
    <div
      className="relative h-[460px] w-full overflow-hidden rounded-[28px] bg-navy shadow-pop sm:h-[520px] lg:h-[560px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hình ảnh khám phá Quảng Trị"
    >
      {/* Ảnh nền: chuyển mờ dần + phóng chậm (hiệu ứng Ken Burns) */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              decoding="async"
              className={`h-full w-full object-cover object-center transition-transform duration-[7000ms] ease-out ${isActive ? 'scale-100' : 'scale-110'}`}
            />
          </div>
        );
      })}

      {/* Lớp phủ giúp chữ luôn dễ đọc */}
      <div className="absolute inset-0 bg-gradient-to-t from-scrim/95 via-scrim/45 to-scrim/10 sm:bg-gradient-to-r sm:from-scrim/90 sm:via-scrim/50 sm:to-transparent" />

      {/* Nội dung — key theo slide để chạy lại hiệu ứng trượt lên mỗi lần đổi ảnh */}
      <div
        key={current.id}
        aria-live="polite"
        className="absolute inset-x-0 top-0 bottom-20 flex flex-col justify-end px-6 sm:px-10 lg:max-w-2xl lg:justify-center lg:px-12"
      >
        <div className="mb-4 inline-flex w-fit animate-fade-up items-center gap-2 rounded-full border border-primary-light/40 bg-primary/25 px-3.5 py-1.5 text-xs font-semibold text-primary-light backdrop-blur-md">
          <span aria-hidden="true">★</span>
          <span>{current.badge}</span>
          <span aria-hidden="true">•</span>
          <span>{current.location}</span>
        </div>

        <h1 className="animate-fade-up text-[2rem] font-black leading-[1.1] tracking-tight text-on-media drop-shadow-md [animation-delay:80ms] sm:text-5xl xl:text-[3.5rem]">
          KHÁM PHÁ <br />
          <span className="bg-gradient-to-r from-primary-light to-on-media bg-clip-text text-transparent">QUẢNG TRỊ</span>
        </h1>

        <p className="mt-3 animate-fade-up text-lg font-bold text-primary-light [animation-delay:160ms] sm:text-xl">
          {current.title}
        </p>

        <p className="mt-1.5 max-w-xl animate-fade-up text-sm leading-relaxed text-on-media/90 line-clamp-2 [animation-delay:220ms] sm:text-base sm:line-clamp-none">
          {current.subtitle}
        </p>

        <p className="mt-5 hidden animate-fade-up border-l-2 border-primary-light pl-3 text-sm italic text-on-media/75 [animation-delay:280ms] sm:block">
          "Về miền di sản – Khám phá thiên nhiên – Trải nghiệm những hành trình đáng nhớ."
        </p>
      </div>

      {/* Thanh điều khiển: chỉ báo vị trí slide (trái) + nút trái/phải (phải) */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-6 pb-6 sm:px-10 lg:px-12">
        <div className="flex items-center gap-3">
          <span className="whitespace-nowrap text-sm font-bold tabular-nums text-on-media">
            {pad(currentIndex + 1)}
            <span className="font-medium text-on-media/50"> / {pad(total)}</span>
          </span>
          <div className="flex items-center gap-1.5">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Chuyển đến slide ${slide.title}`}
                aria-current={idx === currentIndex}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === currentIndex ? 'w-8 bg-primary-light' : 'w-3 bg-on-media/40 hover:bg-on-media/80'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={prevSlide} aria-label="Ảnh trước" className={arrowClass}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" onClick={nextSlide} aria-label="Ảnh kế tiếp" className={arrowClass}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
