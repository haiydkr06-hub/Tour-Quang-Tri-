import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { TravelArticle } from '../types';
import { ArticleDetailModal } from './ArticleDetailModal';

export interface HomeTravelArticlesSectionProps {
  articles: TravelArticle[];
}

const CATEGORIES = ['Tất cả', 'Kinh nghiệm', 'Ẩm thực', 'Lưu trú', 'Lễ hội'] as const;

export function HomeTravelArticlesSection({ articles }: HomeTravelArticlesSectionProps) {
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState<string>('Tất cả');
  const [activeArticle, setActiveArticle] = useState<TravelArticle | null>(null);

  const filtered =
    selectedCat === 'Tất cả'
      ? articles
      : articles.filter((a) => a.category === selectedCat);

  return (
    <section id="gioi-thieu" className="reveal scroll-mt-24 space-y-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary before:h-px before:w-6 before:bg-primary before:content-['']">
            Cẩm Nang & Trải Nghiệm
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem] sm:leading-tight">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((art) => (
          <article
            key={art.id}
            tabIndex={0}
            role="button"
            aria-label={`Xem chi tiết bài viết: ${art.title}`}
            onClick={() => setActiveArticle(art)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveArticle(art);
              }
            }}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface-card shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-surface-alt">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
                <h3 className="text-base font-bold text-ink leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {art.title}
                </h3>
                <p className="text-sm text-ink-muted line-clamp-3 leading-relaxed">
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

      <ArticleDetailModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onExploreTour={(tourId) => navigate(`/tours/${tourId}`)}
      />
    </section>
  );
}
