import { Link } from 'react-router';
import type { Tour } from '../types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface TourCardProps {
  tour: Tour;
}

/**
 * Thẻ hiển thị tóm tắt Tour du lịch Quảng Trị.
 */
export function TourCard({ tour }: TourCardProps) {
  const formatPrice = (val: number) => `${val.toLocaleString('vi-VN')} đ`;

  return (
    <Card isHoverable className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-video w-full overflow-hidden bg-surface-alt">
        <img
          src={tour.imageUrl}
          alt={tour.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {tour.isFeatured ? (
          <span className="absolute top-3 left-3 rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
            Nổi bật
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 rounded-md bg-surface-card/90 px-2 py-0.5 text-xs font-semibold text-ink backdrop-blur-xs">
          ⏱ {tour.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs text-ink-muted">
          <span className="text-warning">★</span>
          <span className="font-bold text-ink">{tour.rating}</span>
          <span>({tour.reviewsCount} đánh giá)</span>
        </div>

        <h3 className="mt-2 text-lg font-bold text-ink hover:text-primary transition-colors line-clamp-1">
          {tour.name}
        </h3>

        <p className="mt-2 text-xs text-ink-muted line-clamp-2 leading-relaxed">
          {tour.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tour.locations.slice(0, 3).map((loc) => (
            <Badge key={loc} variant="neutral" className="text-[10px]">
              📍 {loc}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-[11px] text-ink-muted">Giá từ</p>
            <p className="text-base font-extrabold text-primary">
              {formatPrice(tour.price)}
            </p>
          </div>

          <Link to={`/tours/${tour.id}`}>
            <Button variant="primary" size="sm">
              Xem Chi Tiết
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
