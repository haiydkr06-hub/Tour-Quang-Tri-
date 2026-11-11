import type { DestinationHighlight } from '../types';
import { SectionHeading } from '@/components/SectionHeading';

export interface HomeDestinationsSectionProps {
  destinations: DestinationHighlight[];
  onSelectCategory?: (category: string) => void;
}

export function HomeDestinationsSection({
  destinations,
  onSelectCategory,
}: HomeDestinationsSectionProps) {
  return (
    <section id="kham-pha" aria-labelledby="kham-pha-title" className="reveal scroll-mt-24">
      <SectionHeading
        id="kham-pha-title"
        eyebrow="Điểm Đến Nổi Bật"
        title="Khám Phá Sắc Màu Quảng Trị"
        description="Từ chiến trường rực lửa đến biển xanh Cồn Cỏ hoang sơ và nét đẹp văn hóa bản địa độc đáo."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {destinations.length === 0
          ? [1, 2, 3].map((i) => <div key={i} aria-hidden="true" className="h-72 animate-pulse rounded-3xl bg-surface-alt" />)
          : null}

        {destinations.map((dest) => (
          <article
            key={dest.id}
            className="group relative isolate h-72 overflow-hidden rounded-3xl bg-navy shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover sm:h-80"
          >
            {/* Ảnh nền — phóng to nhẹ khi di chuột */}
            <img
              src={dest.imageUrl}
              alt={dest.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-scrim/95 via-scrim/35 to-transparent" />

            <div className="flex items-start justify-between gap-2 p-4">
              <span className="rounded-full border border-on-media/30 bg-surface-card/90 px-3 py-1 text-[11px] font-bold text-ink shadow-sm backdrop-blur-md">
                {dest.tag}
              </span>
              <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-sm">
                {dest.toursCount} Tours
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary-light">{dest.categoryName}</p>
              <h3 className="mt-1 text-xl font-extrabold leading-tight text-on-media sm:text-2xl">{dest.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-on-media/80 line-clamp-2">{dest.description}</p>

              {/* Nút khám phá: phủ toàn bộ thẻ (after:inset-0) để bấm vào đâu trên thẻ cũng được */}
              <button
                type="button"
                onClick={() => onSelectCategory?.(dest.category)}
                aria-label={`Khám phá — Xem các tour ${dest.name}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-on-media/15 px-4 py-2 text-xs font-bold text-on-media backdrop-blur-md transition-all after:absolute after:inset-0 after:content-[''] group-hover:bg-primary group-hover:text-primary-foreground cursor-pointer"
              >
                Khám phá
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
