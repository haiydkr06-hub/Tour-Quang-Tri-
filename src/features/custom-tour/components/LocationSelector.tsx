import type { DragEvent } from 'react';
import type { HistoricalDestination } from '../types';
import { Badge } from '@/components/ui/Badge';

/** Kiểu dữ liệu kéo thả dùng chung giữa danh mục địa danh và lịch trình */
export const DND_DESTINATION_TYPE = 'application/x-qt-destination';

export interface LocationSelectorProps {
  destinations: HistoricalDestination[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

const formatVND = (v: number) => (v === 0 ? 'Miễn phí' : `${v.toLocaleString('vi-VN')} đ`);

/**
 * Danh mục di tích: kéo thẻ vào "Lịch trình của bạn" để thêm đúng vị trí,
 * hoặc bấm (chuột / Enter / Space) để thêm-bớt nhanh vào cuối lịch trình.
 */
export function LocationSelector({ destinations, selectedIds, onToggle }: LocationSelectorProps) {
  const handleDragStart = (e: DragEvent<HTMLButtonElement>, id: string) => {
    e.dataTransfer.setData(DND_DESTINATION_TYPE, id);
    e.dataTransfer.effectAllowed = 'copyMove';
  };

  return (
    <section className="space-y-4" aria-labelledby="location-heading">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="location-heading" className="text-lg font-bold text-ink">
          1. Chọn các địa danh di tích ({selectedIds.length}/{destinations.length})
        </h2>
        <span className="text-xs text-ink-muted">Kéo thẻ vào lịch trình, hoặc bấm để thêm/bớt</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {destinations.map((dest) => {
          const isSelected = selectedIds.includes(dest.id);
          return (
            <button
              key={dest.id}
              type="button"
              draggable
              onDragStart={(e) => handleDragStart(e, dest.id)}
              onClick={() => onToggle(dest.id)}
              aria-pressed={isSelected}
              className={`flex cursor-grab gap-4 rounded-xl border bg-surface-card p-4 text-left shadow-xs transition-all active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-primary ${
                isSelected ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={dest.imageUrl}
                alt=""
                draggable={false}
                className="h-20 w-24 shrink-0 rounded-lg bg-surface-alt object-cover"
              />
              <span className="flex flex-1 flex-col justify-between">
                <span>
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-xs text-ink-muted">📍 {dest.region}</span>
                    <Badge variant={isSelected ? 'primary' : 'neutral'}>
                      {isSelected ? '✓ Đã chọn' : '+ Chọn'}
                    </Badge>
                  </span>
                  <span className="mt-1 block text-sm font-bold text-ink line-clamp-1">{dest.name}</span>
                  <span className="mt-1 block text-xs text-ink-muted line-clamp-2">{dest.description}</span>
                </span>
                <span className="mt-2 flex items-center justify-between border-t border-border/50 pt-1.5 text-[11px] text-ink-muted">
                  <span>⏱ {dest.timeRequired}</span>
                  <span className="font-semibold text-primary">Vé: {formatVND(dest.entryFee)}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
