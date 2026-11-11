/**
 * Khung chờ (skeleton) có cùng hình dáng thẻ tour, hiển thị trong lúc tải dữ liệu.
 */
export function TourCardSkeleton() {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-3xl border border-border/80 bg-surface-card shadow-card">
      <div className="aspect-[4/3] w-full animate-pulse bg-surface-alt" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-24 animate-pulse rounded-full bg-surface-alt" />
        <div className="h-5 w-4/5 animate-pulse rounded-full bg-surface-alt" />
        <div className="h-3 w-full animate-pulse rounded-full bg-surface-alt" />
        <div className="h-3 w-2/3 animate-pulse rounded-full bg-surface-alt" />
        <div className="flex items-end justify-between border-t border-border pt-4">
          <div className="h-6 w-28 animate-pulse rounded-full bg-surface-alt" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-9 animate-pulse rounded-xl bg-surface-alt" />
          <div className="h-9 animate-pulse rounded-xl bg-surface-alt" />
        </div>
      </div>
    </div>
  );
}
