import { Link } from 'react-router';
import type { Tour } from '../types';
import { discountPercent, formatVND } from '../format';
import { Button, buttonClasses } from '@/components/ui/Button';
import { TourIcon } from './TourIcon';
import { TOUR_INCLUDED_SERVICES } from '../service';

export interface TourBookingCardProps {
  tour: Tour;
  onBookNow: (tour: Tour) => void;
}


/**
 * Khung giá & đặt tour (dính khi cuộn trên máy tính).
 * Giữ nguyên nội dung cũ; hiện thêm giá gốc và % tiết kiệm — dữ liệu có sẵn của tour.
 * (Ngày khởi hành, số chỗ còn đã hiện ở hàng thông tin nhanh phía trên nên không lặp lại.)
 */
export function TourBookingCard({ tour, onBookNow }: TourBookingCardProps) {
  const discount = discountPercent(tour.price, tour.originalPrice);

  return (
    <aside className="overflow-hidden rounded-3xl border border-border/80 bg-surface-card shadow-card lg:sticky lg:top-24">
      <div className="bg-navy px-6 py-5 text-on-media dark:bg-surface-alt">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-media/70">Giá trọn gói một khách</p>
        <div className="mt-1.5 flex flex-wrap items-end gap-x-3 gap-y-1">
          <p className="text-3xl font-extrabold text-primary-light">{formatVND(tour.price)}</p>
          {discount && tour.originalPrice ? (
            <p className="pb-1 text-sm text-on-media/60 line-through">{formatVND(tour.originalPrice)}</p>
          ) : null}
        </div>
        {discount ? (
          <p className="mt-2 inline-flex rounded-full bg-danger px-2.5 py-0.5 text-xs font-bold text-danger-foreground">
            Tiết kiệm {discount}%
          </p>
        ) : null}
      </div>

      <div className="p-6">
        <ul className="space-y-2.5 text-sm text-ink-muted">
          {TOUR_INCLUDED_SERVICES.map(({ text: item }) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15">
                <TourIcon name="check" className="h-3 w-3 text-success" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <Button variant="primary" size="lg" className="mt-6 w-full" onClick={() => onBookNow(tour)}>
          Đặt Tour Này
        </Button>
        <Link to="/custom-tour" className={buttonClasses('outline', 'md', 'mt-3 w-full')}>
          ✏️ Tự Thiết Kế Tour Riêng
        </Link>
      </div>
    </aside>
  );
}
