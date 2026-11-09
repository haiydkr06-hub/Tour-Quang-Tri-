import { Link } from 'react-router';
import type { Tour } from '../types';
import { Button } from '@/components/ui/Button';

export interface TourCardItemProps {
  tour: Tour;
  onBookNow?: (tour: Tour) => void;
}

export function TourCardItem({ tour, onBookNow }: TourCardItemProps) {
  const discountPercent =
    tour.originalPrice && tour.originalPrice > tour.price
      ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
      : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image & Badges */}
      <div className="relative h-52 w-full overflow-hidden bg-surface-alt">
        <img
          src={tour.imageUrl}
          alt={tour.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-scrim/60 via-transparent to-transparent opacity-80" />

        {/* Category tag */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {tour.isFeatured && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-black text-primary-foreground shadow-sm">
              ★ NỔI BẬT
            </span>
          )}
          {discountPercent && (
            <span className="rounded-full bg-danger px-2 py-0.5 text-[10px] font-black text-danger-foreground shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-surface-card/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm">
            ⏱ {tour.duration}
          </span>
        </div>

        {/* Available seats */}
        {tour.availableSeats && (
          <div className="absolute bottom-3 right-3">
            <span className="rounded-full bg-scrim/75 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-on-media shadow-sm">
              Còn {tour.availableSeats} chỗ
            </span>
          </div>
        )}
      </div>

      {/* Body content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2">
          {/* Rating & Departure */}
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <div className="flex items-center gap-1 font-semibold text-warning">
              <span>★</span>
              <span>{tour.rating.toFixed(1)}</span>
              <span className="text-ink-muted">({tour.reviewsCount})</span>
            </div>
            {tour.departureFrom && (
              <span className="truncate max-w-[140px]">📍 {tour.departureFrom}</span>
            )}
          </div>

          <Link to={`/tours/${tour.id}`}>
            <h3 className="text-base font-bold text-ink leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {tour.name}
            </h3>
          </Link>

          <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
            {tour.description}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="border-t border-border pt-4">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <p className="text-[10px] uppercase font-bold text-ink-muted">Giá trọn gói</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-primary">
                  {tour.price.toLocaleString('vi-VN')}₫
                </span>
                {tour.originalPrice && tour.originalPrice > tour.price && (
                  <span className="text-xs text-ink-muted line-through">
                    {tour.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                )}
              </div>
            </div>
            {tour.departureDate && (
              <span className="text-[11px] font-medium text-ink-muted">
                Khởi hành: {tour.departureDate}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link to={`/tours/${tour.id}`}>
              <Button variant="outline" size="sm" className="w-full text-xs">
                Chi tiết
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              className="w-full text-xs"
              onClick={() => onBookNow?.(tour)}
            >
              Đặt tour
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
