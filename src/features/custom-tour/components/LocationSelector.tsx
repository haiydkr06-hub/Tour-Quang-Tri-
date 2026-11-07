import type { HistoricalDestination } from '../types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface LocationSelectorProps {
  destinations: HistoricalDestination[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

/**
 * Thành phần chọn các điểm di tích lịch sử để tạo lịch trình tour tùy chỉnh.
 */
export function LocationSelector({
  destinations,
  selectedIds,
  onToggle,
}: LocationSelectorProps) {
  const formatVND = (v: number) => (v === 0 ? 'Miễn phí' : `${v.toLocaleString('vi-VN')} đ`);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">
          1. Chọn các địa danh di tích ({selectedIds.length}/{destinations.length})
        </h2>
        <span className="text-xs text-ink-muted">Nhấn vào thẻ để thêm/bớt địa danh</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {destinations.map((dest) => {
          const isSelected = selectedIds.includes(dest.id);
          return (
            <Card
              key={dest.id}
              onClick={() => onToggle(dest.id)}
              className={`flex cursor-pointer gap-4 p-4 transition-all ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : 'hover:border-border/80'
              }`}
            >
              <img
                src={dest.imageUrl}
                alt={dest.name}
                className="h-20 w-24 rounded-lg object-cover bg-surface-alt shrink-0"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-ink-muted">📍 {dest.region}</span>
                    <Badge variant={isSelected ? 'primary' : 'neutral'}>
                      {isSelected ? '✓ Đã chọn' : '+ Chọn'}
                    </Badge>
                  </div>
                  <h3 className="mt-1 text-sm font-bold text-ink line-clamp-1">
                    {dest.name}
                  </h3>
                  <p className="mt-1 text-xs text-ink-muted line-clamp-2">
                    {dest.description}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-ink-muted border-t border-border/50 pt-1.5">
                  <span>⏱ {dest.timeRequired}</span>
                  <span className="font-semibold text-primary">
                    Vé: {formatVND(dest.entryFee)}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
