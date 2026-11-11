import type { TourReview } from '../types';

export interface HomeReviewsSectionProps {
  reviews: TourReview[];
}

export function HomeReviewsSection({ reviews }: HomeReviewsSectionProps) {
  return (
    <section id="danh-gia" className="reveal scroll-mt-24 space-y-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary before:h-px before:w-6 before:bg-primary before:content-['']">
            Cảm Nhận Thực Tế
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem] sm:leading-tight">
            Khách Hàng Nói Về Tour Quảng Trị
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-border/80 bg-surface-card px-4 py-2 shadow-card">
          <span className="text-warning font-bold text-sm">★ 4.9/5.0</span>
          <span className="text-xs text-ink-muted">từ 1.250+ du khách đã đi</span>
        </div>
      </div>

      {/* Điện thoại: vuốt ngang từng thẻ (snap); từ máy tính bảng: lưới */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="group relative flex w-[85%] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl sm:w-auto border border-border/80 bg-surface-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
          >
            <span aria-hidden="true" className="pointer-events-none absolute right-4 top-2 font-serif text-[88px] leading-[0.8] text-primary/10 transition-colors duration-300 group-hover:text-primary/20">
              &rdquo;
            </span>
            <div className="space-y-3">
              {/* Stars & Date */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex text-warning text-sm">
                  {'★'.repeat(Math.floor(rev.rating))}
                  {rev.rating % 1 !== 0 && '½'}
                </div>
                <span className="text-[11px] text-ink-muted">{rev.reviewDate}</span>
              </div>

              {/* Tour taken */}
              <p className="text-[11px] font-semibold text-primary line-clamp-1">
                📍 {rev.tourName}
              </p>

              {/* Review content */}
              <p className="text-sm leading-relaxed text-ink/90 italic">
                "{rev.content}"
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 border-t border-border pt-4 mt-4">
              <img
                src={rev.authorAvatar}
                alt={rev.authorName}
                className="h-10 w-10 rounded-full object-cover border border-border"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-ink truncate">{rev.authorName}</p>
                <p className="text-[10px] text-ink-muted flex items-center gap-1">
                  <span>{rev.authorLocation}</span>
                  <span>•</span>
                  <span className="text-success font-medium">✓ Đã đi tour</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
