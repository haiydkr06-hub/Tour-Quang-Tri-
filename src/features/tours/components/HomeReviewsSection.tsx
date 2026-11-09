import type { TourReview } from '../types';

export interface HomeReviewsSectionProps {
  reviews: TourReview[];
}

export function HomeReviewsSection({ reviews }: HomeReviewsSectionProps) {
  return (
    <section id="danh-gia" className="scroll-mt-20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Cảm Nhận Thực Tế
          </span>
          <h2 className="text-2xl font-black text-ink sm:text-3xl">
            Khách Hàng Nói Về Tour Quảng Trị
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-surface-card border border-border px-3.5 py-1.5 shadow-sm">
          <span className="text-warning font-bold text-sm">★ 4.9/5.0</span>
          <span className="text-xs text-ink-muted">từ 1.250+ du khách đã đi</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="flex flex-col justify-between rounded-3xl border border-border bg-surface-card p-5 shadow-sm hover:shadow-md transition-shadow"
          >
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
              <p className="text-xs text-ink leading-relaxed italic">
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
