import { Link } from 'react-router';
import type { Tour } from '../types';
import { formatTourDate } from '../format';
import { TourDetailHero } from './TourDetailHero';
import { TourBookingCard } from './TourBookingCard';
import { TourIcon, type TourIconName } from './TourIcon';

export interface TourDetailViewProps {
  tour: Tour;
  categoryLabel?: string;
  onBookNow: (tour: Tour) => void;
}

const sectionClass = 'reveal rounded-3xl border border-border/80 bg-surface-card p-6 shadow-card sm:p-8';
const headingClass = 'text-xl font-bold tracking-tight text-ink';

/**
 * Presentational View: chi tiết tour — ảnh lớn, thông tin nhanh, giới thiệu, lịch trình và khung đặt tour.
 */
export function TourDetailView({ tour, categoryLabel, onBookNow }: TourDetailViewProps) {
  const facts: { icon: TourIconName; label: string; value?: string }[] = [
    { icon: 'clock', label: 'Thời lượng', value: tour.duration },
    { icon: 'calendar', label: 'Khởi hành', value: tour.departureDate && formatTourDate(tour.departureDate) },
    { icon: 'flag', label: 'Xuất phát', value: tour.departureFrom },
    { icon: 'users', label: 'Chỗ còn trống', value: tour.availableSeats ? `${tour.availableSeats} chỗ` : undefined },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Đường dẫn" className="mb-5 text-sm text-ink-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link to="/" className="hover:text-primary">Trang chủ</Link></li>
          <li aria-hidden="true">›</li>
          <li><Link to="/tours" className="hover:text-primary">Tour du lịch</Link></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="max-w-[16rem] truncate font-semibold text-ink sm:max-w-md">{tour.name}</li>
        </ol>
      </nav>

      <TourDetailHero tour={tour} categoryLabel={categoryLabel} />

      <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {facts.filter((f) => f.value).map((f) => (
          <div key={f.label} className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-surface-card p-3 shadow-card sm:gap-3 sm:p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:h-10 sm:w-10">
              <TourIcon name={f.icon} className="h-5 w-5 text-primary" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs text-ink-muted">{f.label}</dt>
              <dd className="text-sm font-bold leading-snug text-ink">{f.value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className={sectionClass}>
            <h2 className={headingClass}>Giới thiệu chuyến đi</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{tour.description}</p>

            <h3 className="mt-7 text-sm font-bold uppercase tracking-wider text-ink">Điểm đến di tích</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {tour.locations.map((loc) => (
                <li key={loc} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-alt px-3 py-1.5 text-sm font-medium text-ink">
                  <TourIcon name="pin" className="h-3.5 w-3.5 text-primary" /> {loc}
                </li>
              ))}
            </ul>

            <h3 className="mt-7 text-sm font-bold uppercase tracking-wider text-ink">Điểm nổi bật</h3>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tour.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 rounded-2xl bg-primary/5 p-3 text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                    <TourIcon name="check" className="h-3 w-3 text-primary-foreground" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Lịch trình chi tiết</h2>
            <ol className="relative mt-6 space-y-6 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-0.5 before:bg-primary/20">
              {tour.itinerary.map((item, idx) => (
                <li key={`${item.time}-${idx}`} className="relative pl-9">
                  <span aria-hidden="true" className="absolute left-0 top-1 h-4 w-4 rounded-full border-4 border-surface-card bg-primary ring-2 ring-primary/30" />
                  <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">{item.time}</span>
                  <p className="mt-1.5 font-medium leading-relaxed text-ink">{item.activity}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="order-first lg:order-none lg:col-span-1">
          <TourBookingCard tour={tour} onBookNow={onBookNow} />
        </div>
      </div>
    </div>
  );
}
