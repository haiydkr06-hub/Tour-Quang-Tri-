import { TOUR_INCLUDED_SERVICES } from '../service';
import { TourIcon } from './TourIcon';

/**
 * Dải cam kết dịch vụ dưới banner — dùng lại đúng các dịch vụ đã bao gồm trong tour,
 * không thêm số liệu hay khuyến mãi mới.
 */
export function HomeServiceStrip() {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {TOUR_INCLUDED_SERVICES.map((item, idx) => (
        <li
          key={item.text}
          style={{ animationDelay: `${200 + idx * 80}ms` }}
          className="group flex flex-col items-start gap-2.5 rounded-2xl border border-border/80 bg-surface-card p-3.5 shadow-card sm:flex-row sm:items-center sm:gap-3.5 sm:p-4 transition-all duration-300 animate-fade-up hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover"
        >
          <span className="flex h-10 w-10 shrink-0 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
            <TourIcon name={item.icon} className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
          </span>
          <span className="text-xs font-semibold leading-snug text-ink sm:text-sm">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}
