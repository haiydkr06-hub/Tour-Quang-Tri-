import type { Tour } from '../types';
import { TourCard } from './TourCard';
import { Button } from '@/components/ui/Button';

export interface TourListViewProps {
  tours: Tour[];
  isLoading: boolean;
  onResetFilter: () => void;
}

/**
 * Presentational View: Hiển thị danh sách thẻ Tour hoặc trạng thái rỗng khi lọc.
 */
export function TourListView({ tours, isLoading, onResetFilter }: TourListViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-96 animate-pulse rounded-xl border border-border bg-surface-alt"
          />
        ))}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface-card p-12 text-center">
        <span className="text-4xl">🔍</span>
        <h3 className="mt-4 text-lg font-bold text-ink">
          Không tìm thấy tour phù hợp
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
          Không có chuyến tham quan nào khớp với tiêu chí tìm kiếm hoặc khoảng giá bạn vừa chọn.
        </p>
        <div className="mt-6">
          <Button variant="outline" size="sm" onClick={onResetFilter}>
            Xóa bộ lọc & Xem tất cả tour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-xs text-ink-muted">
        <span>Tìm thấy <strong className="text-ink">{tours.length}</strong> chuyến tour</span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
