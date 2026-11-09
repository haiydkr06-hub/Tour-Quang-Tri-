import type { DestinationHighlight } from '../types';

export interface HomeDestinationsSectionProps {
  destinations: DestinationHighlight[];
  onSelectCategory?: (category: string) => void;
}

export function HomeDestinationsSection({
  destinations,
  onSelectCategory,
}: HomeDestinationsSectionProps) {
  return (
    <section id="kham-pha" className="scroll-mt-20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Điểm Đến Nổi Bật
          </span>
          <h2 className="text-2xl font-black text-ink sm:text-3xl">
            Khám Phá Sắc Màu Quảng Trị
          </h2>
        </div>
        <p className="text-xs text-ink-muted max-w-md">
          Từ chiến trường rực lửa đến biển xanh Cồn Cỏ hoang sơ và nét đẹp văn hóa bản địa độc đáo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => onSelectCategory?.(dest.category)}
            className="group relative h-64 overflow-hidden rounded-3xl border border-border bg-surface-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectCategory?.(dest.category);
              }
            }}
          >
            {/* Background Image with Zoom */}
            <img
              src={dest.imageUrl}
              alt={dest.name}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark & Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-scrim/95 via-scrim/40 to-transparent transition-opacity group-hover:via-scrim/50" />

            {/* Badge top-left */}
            <div className="absolute top-4 left-4">
              <span className="rounded-full bg-surface-card/85 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-ink border border-border/40 shadow-sm">
                {dest.tag}
              </span>
            </div>

            {/* Tours count top-right */}
            <div className="absolute top-4 right-4">
              <span className="rounded-full bg-primary/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-black text-primary-foreground shadow-sm">
                {dest.toursCount} Tours
              </span>
            </div>

            {/* Content bottom */}
            <div className="absolute bottom-0 inset-x-0 p-5 text-on-media">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-light">
                {dest.categoryName}
              </p>
              <h3 className="text-xl font-black text-on-media leading-tight mt-0.5 group-hover:text-primary-light transition-colors">
                {dest.name}
              </h3>
              <p className="mt-1 text-xs text-on-media/80 line-clamp-2 leading-relaxed">
                {dest.description}
              </p>
              <div className="mt-2 flex items-center text-xs font-bold text-primary-light gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Xem các tour</span>
                <span>➔</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
