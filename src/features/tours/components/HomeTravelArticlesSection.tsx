import { useState } from 'react';
import type { TravelArticle } from '../types';

export interface HomeTravelArticlesSectionProps {
  articles: TravelArticle[];
}

const CATEGORIES = ['Tất cả', 'Kinh nghiệm', 'Ẩm thực', 'Lưu trú', 'Lễ hội'] as const;

export function HomeTravelArticlesSection({ articles }: HomeTravelArticlesSectionProps) {
  const [selectedCat, setSelectedCat] = useState<string>('Tất cả');

  const filtered =
    selectedCat === 'Tất cả'
      ? articles
      : articles.filter((a) => a.category === selectedCat);

  return (
    <section id="gioi-thieu" className="scroll-mt-20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Cẩm Nang & Trải Nghiệm
          </span>
          <h2 className="text-2xl font-black text-ink sm:text-3xl">
            Bí Quyết Du Lịch Quảng Trị
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-surface-card border border-border text-ink hover:bg-surface-alt'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((art) => (
          <article
            key={art.id}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-card shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-surface-alt">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-surface-card/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-primary">
                  {art.category}
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-scrim/75 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-on-media">
                  ⏱ {art.readTime}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[11px] text-ink-muted">{art.date}</span>
                <h3 className="text-sm font-bold text-ink leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-ink-muted line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="border-t border-border p-4 pt-3">
              <span className="flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                Đọc cẩm nang ➔
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
