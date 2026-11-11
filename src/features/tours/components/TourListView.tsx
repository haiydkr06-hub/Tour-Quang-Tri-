import type { Tour } from '../types';
import { TourCardItem } from './TourCardItem';
import { TourCardSkeleton } from './TourCardSkeleton';
import { Button } from '@/components/ui/Button';

export interface TourListViewProps {
  tours: Tour[];
  isLoading: boolean;
  onResetFilter: () => void;
  onBookTour?: (tour: Tour) => void;
}

/**
 * Presentational View: Hiển thị danh sách thẻ Tour, khung chờ khi tải, hoặc trạng thái rỗng khi lọc.
 */
export function TourListView({ tours, isLoading, onResetFilter, onBookTour }: TourListViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Đang tải danh sách tour">
        {[1, 2, 3].map((i) => (
          <TourCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-dashed border-border bg-surface-card px-6 py-14 text-center animate-fade-up">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
        <span aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
          🔍
        </span>
        <h3 className="mt-5 text-xl font-bold text-ink">Không tìm thấy tour phù hợp</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
          Không có chuyến tham quan nào khớp với các tiêu chí lọc bạn vừa chọn. Hãy thử bỏ bớt một vài tiêu chí.
        </p>
        <div className="mt-7">
          <Button variant="primary" size="md" onClick={onResetFilter}>
            Xóa bộ lọc & Xem tất cả tour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-5 text-sm text-ink-muted" role="status">
        Tìm thấy <strong className="text-ink">{tours.length}</strong> chuyến tour
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCardItem key={tour.id} tour={tour} onBookNow={onBookTour} />
        ))}
      </div>
    </div>
  );
}
