import type { Tour } from '../types';
import { discountPercent } from '../format';

export interface TourDetailHeroProps {
  tour: Tour;
  /** Nhãn loại hình (vd "Biển đảo"), không có thì không hiện */
  categoryLabel?: string;
}

/**
 * Ảnh đại diện lớn của tour + tiêu đề, đánh giá. Các nhãn trên ảnh dùng nền đặc
 * để luôn đọc được, dù ảnh sáng hay tối.
 */
export function TourDetailHero({ tour, categoryLabel }: TourDetailHeroProps) {
  const discount = discountPercent(tour.price, tour.originalPrice);

  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-surface-alt shadow-card animate-fade-up">
      <img
        src={tour.imageUrl}
        alt={tour.name}
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-scrim/90 via-scrim/35 to-scrim/5" />

      <div className="flex min-h-[340px] flex-col justify-between gap-10 p-5 sm:min-h-[440px] sm:p-8 lg:min-h-[480px] lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-surface-card px-3 py-1 text-xs font-bold text-ink shadow-sm">
            Mã tour #{tour.id}
          </span>
          {categoryLabel ? (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm">
              {categoryLabel}
            </span>
          ) : null}
          {tour.isFeatured ? (
            <span className="rounded-full bg-scrim/70 px-3 py-1 text-xs font-bold text-on-media backdrop-blur-md">
              ★ Nổi bật
            </span>
          ) : null}
          {discount ? (
            <span className="rounded-full bg-danger px-3 py-1 text-xs font-bold text-danger-foreground shadow-sm">
              -{discount}%
            </span>
          ) : null}
        </div>

        <div className="max-w-3xl text-on-media">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-on-media sm:text-4xl lg:text-5xl">
            {tour.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-on-media/90">
            <span className="inline-flex items-center gap-1.5">
              <span className="text-warning">★</span>
              <strong className="text-on-media">{tour.rating.toFixed(1)}</strong>
              <span>({tour.reviewsCount} đánh giá)</span>
            </span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-on-media/40 sm:block" />
            <span>⏱ {tour.duration}</span>
            {tour.departureFrom ? (
              <>
                <span aria-hidden="true" className="hidden h-4 w-px bg-on-media/40 sm:block" />
                <span>Xuất phát: {tour.departureFrom}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
