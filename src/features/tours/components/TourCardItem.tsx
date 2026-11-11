import { useNavigate } from 'react-router';
import type { Tour } from '../types';
import { Button } from '@/components/ui/Button';
import { discountPercent as getDiscount, formatTourDate, formatVND } from '../format';
import { TourIcon } from './TourIcon';

export interface TourCardItemProps {
  tour: Tour;
  onBookNow?: (tour: Tour) => void;
}

/**
 * Thẻ tour dùng chung: toàn bộ thẻ có thể bấm để chuyển thẳng vào trang xem chi tiết (/tours/:id).
 * Nút "Chi tiết" và "Đặt tour" là các thẻ <button> chuẩn ngữ nghĩa.
 */
export function TourCardItem({ tour, onBookNow }: TourCardItemProps) {
  const navigate = useNavigate();
  const discountPercent = getDiscount(tour.price, tour.originalPrice);
  const hasDiscount = discountPercent !== null;
  const shownLocations = tour.locations.slice(0, 2).join(' · ');
  const moreLocations = tour.locations.length - 2;

  const handleOpenDetail = () => {
    navigate(`/tours/${tour.id}`);
  };

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`Xem chi tiết tour: ${tour.name}`}
      onClick={handleOpenDetail}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpenDetail();
        }
      }}
      className="reveal group flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-card-hover cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
    >
      {/* Ảnh & nhãn */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt">
        <img
          src={tour.imageUrl}
          alt={tour.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-scrim/60 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {tour.isFeatured && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold tracking-wide text-primary-foreground shadow-sm">
              ★ NỔI BẬT
            </span>
          )}
          {discountPercent && (
            <span className="rounded-full bg-danger px-2.5 py-1 text-[10px] font-bold text-danger-foreground shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-surface-card/95 px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm backdrop-blur-md">
            ⏱ {tour.duration}
          </span>
          {tour.availableSeats && (
            <span className="rounded-full bg-scrim/70 px-2.5 py-1 text-[11px] font-semibold text-on-media backdrop-blur-md">
              Còn {tour.availableSeats} chỗ
            </span>
          )}
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="flex items-center gap-1 font-semibold text-warning">
            ★ {tour.rating.toFixed(1)}
            <span className="font-normal text-ink-muted">({tour.reviewsCount})</span>
          </span>
          {tour.departureFrom && <span className="truncate text-ink-muted">Xuất phát: {tour.departureFrom}</span>}
        </div>

        <h3 className="mt-2 text-[17px] font-bold leading-snug text-ink line-clamp-2 transition-colors group-hover:text-primary">
          {tour.name}
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted line-clamp-2">{tour.description}</p>

        <ul className="mt-3 space-y-1.5 text-xs text-ink-muted">
          <li className="flex items-center gap-2">
            <TourIcon name="pin" />
            <span className="truncate">
              {shownLocations}
              {moreLocations > 0 ? ` +${moreLocations}` : ''}
            </span>
          </li>
          {tour.departureDate && (
            <li className="flex items-center gap-2">
              <TourIcon name="calendar" />
              <span>Khởi hành: {formatTourDate(tour.departureDate)}</span>
            </li>
          )}
        </ul>

        {/* Giá & hành động */}
        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-end justify-between gap-2 border-t border-border pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Giá trọn gói</p>
              <p className="text-xl font-extrabold text-primary">{formatVND(tour.price)}</p>
            </div>
            {hasDiscount && tour.originalPrice && (
              <span className="pb-1 text-xs text-ink-subtle line-through">{formatVND(tour.originalPrice)}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full relative z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDetail();
              }}
            >
              Chi tiết
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="w-full relative z-10"
              onClick={(e) => {
                e.stopPropagation();
                onBookNow?.(tour);
              }}
            >
              Đặt tour
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
