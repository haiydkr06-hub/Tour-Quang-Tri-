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
    <section id="uu-dai" className="reveal scroll-mt-24 space-y-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary before:h-px before:w-6 before:bg-primary before:content-['']">
            Bộ Sưu Tập Chủ Đề
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem] sm:leading-tight">
            Những Chuyến Đi Không Thể Bỏ Lỡ
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-ink-muted">
          Các hành trình được thiết kế chuyên biệt theo từng chủ đề trải nghiệm chiều sâu di sản.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {collections.map((col) => (
          <article
            key={col.id}
            className="group relative isolate h-80 overflow-hidden rounded-3xl bg-navy shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover"
          >
            <img
              src={col.imageUrl}
              alt={col.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-scrim/95 via-scrim/45 to-transparent" />

            <div className="absolute right-4 top-4">
              <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-sm">
                {col.toursCount} Tours
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 space-y-1.5 p-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary-light">
                Chuyên đề Quảng Trị
              </span>
              <h3 className="text-lg font-extrabold leading-tight text-on-media">{col.title}</h3>
              <p className="text-sm leading-relaxed text-on-media/80 line-clamp-2">{col.subtitle}</p>
              {/* Liên kết phủ toàn bộ thẻ (after:inset-0) — dùng đúng trường link có sẵn trong dữ liệu */}
              <a
                href={col.link}
                onClick={() => onSelectCollection?.(col.id)}
                className="inline-flex items-center gap-1.5 pt-2 text-xs font-bold text-primary-light after:absolute after:inset-0 after:content-['']"
              >
                <span>Khám phá bộ sưu tập</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">➔</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
