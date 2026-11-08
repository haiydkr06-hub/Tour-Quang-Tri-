import type { TourCollection } from '../types';

export interface HomeCollectionsSectionProps {
  collections: TourCollection[];
  onSelectCollection?: (collectionId: string) => void;
}

export function HomeCollectionsSection({
  collections,
  onSelectCollection,
}: HomeCollectionsSectionProps) {
  return (
    <section id="uu-dai" className="scroll-mt-20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Bộ Sưu Tập Chủ Đề
          </span>
          <h2 className="text-2xl font-black text-ink sm:text-3xl">
            Những Chuyến Đi Không Thể Bỏ Lỡ
          </h2>
        </div>
        <p className="text-xs text-ink-muted max-w-md">
          Các hành trình được thiết kế chuyên biệt theo từng chủ đề trải nghiệm chiều sâu di sản.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            onClick={() => onSelectCollection?.(col.id)}
            className="group relative h-80 overflow-hidden rounded-3xl border border-border bg-surface-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectCollection?.(col.id);
              }
            }}
          >
            <img
              src={col.imageUrl}
              alt={col.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-transparent" />

            <div className="absolute top-4 right-4">
              <span className="rounded-full bg-primary/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-black text-white shadow-sm">
                {col.toursCount} Tours
              </span>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary-light">
                Chuyên đề Quảng Trị
              </span>
              <h3 className="text-lg font-black text-white leading-tight group-hover:text-primary-light transition-colors">
                {col.title}
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                {col.subtitle}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-primary-light">
                <span>Khám phá bộ sưu tập</span>
                <span className="transition-transform group-hover:translate-x-1">➔</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
