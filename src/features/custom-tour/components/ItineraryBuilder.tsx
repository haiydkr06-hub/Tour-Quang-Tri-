import { useState, type DragEvent } from 'react';
import type { HistoricalDestination } from '../types';
import { DND_DESTINATION_TYPE } from './LocationSelector';

const DND_INDEX_TYPE = 'application/x-qt-itinerary-index';

export interface ItineraryBuilderProps {
  /** Các điểm đã chọn, đúng thứ tự tham quan */
  stops: HistoricalDestination[];
  onAdd: (id: string, index: number) => void;
  onMove: (from: number, to: number) => void;
  onRemove: (id: string) => void;
}

const iconBtn =
  'h-7 w-7 rounded-md border border-border bg-surface text-xs font-bold text-ink hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink cursor-pointer';

/**
 * Vùng "Lịch trình của bạn" (user story 1):
 * - Thả thẻ địa danh từ danh mục vào để thêm tại đúng vị trí.
 * - Kéo các điểm trong lịch trình để đổi thứ tự tham quan.
 * - Nút ↑ ↓ ✕ thay thế cho kéo thả khi dùng bàn phím / màn hình cảm ứng.
 */
export function ItineraryBuilder({ stops, onAdd, onMove, onRemove }: ItineraryBuilderProps) {
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const allowDrop = (e: DragEvent, index: number) => {
    e.preventDefault();
    setDropIndex(index);
  };

  const handleDrop = (e: DragEvent, index: number) => {
    e.preventDefault();
    setDropIndex(null);
    const fromIndex = e.dataTransfer.getData(DND_INDEX_TYPE);
    if (fromIndex !== '') {
      const from = Number(fromIndex);
      onMove(from, from < index ? index - 1 : index);
      return;
    }
    const id = e.dataTransfer.getData(DND_DESTINATION_TYPE);
    if (id) onAdd(id, index);
  };

  return (
    <section
      aria-labelledby="itinerary-heading"
      onDragOver={(e) => allowDrop(e, stops.length)}
      onDragLeave={() => setDropIndex(null)}
      onDrop={(e) => handleDrop(e, dropIndex ?? stops.length)}
      className={`rounded-2xl border-2 border-dashed p-4 transition-colors ${
        dropIndex !== null ? 'border-primary bg-primary/5' : 'border-border bg-surface-card'
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 id="itinerary-heading" className="text-lg font-bold text-ink">
          🗺️ Lịch trình của bạn ({stops.length} điểm)
        </h2>
        <span className="text-xs text-ink-muted">Kéo để sắp xếp thứ tự tham quan</span>
      </div>

      {stops.length === 0 ? (
        <p className="py-8 text-center text-sm text-ink-muted">
          Chưa có điểm nào. Kéo thẻ địa danh bên dưới thả vào đây (hoặc bấm vào thẻ) để bắt đầu lịch trình.
        </p>
      ) : (
        <ol className="space-y-2">
          {stops.map((stop, index) => (
            <li
              key={stop.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(DND_INDEX_TYPE, String(index));
                e.dataTransfer.effectAllowed = 'move';
              }}
              onDragOver={(e) => {
                e.stopPropagation();
                allowDrop(e, index);
              }}
              onDrop={(e) => {
                e.stopPropagation();
                handleDrop(e, index);
              }}
              className={`flex cursor-grab items-center gap-3 rounded-xl border bg-surface p-2.5 active:cursor-grabbing ${
                dropIndex === index ? 'border-primary border-t-4' : 'border-border'
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </span>
              <img src={stop.imageUrl} alt="" draggable={false} className="h-10 w-14 rounded-md object-cover" />
              <span className="flex-1">
                <span className="block text-sm font-semibold text-ink">{stop.name}</span>
                <span className="text-[11px] text-ink-muted">⏱ {stop.timeRequired}</span>
              </span>
              <span className="flex gap-1">
                <button
                  type="button"
                  className={iconBtn}
                  disabled={index === 0}
                  onClick={() => onMove(index, index - 1)}
                  aria-label={`Đưa ${stop.name} lên trước`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={iconBtn}
                  disabled={index === stops.length - 1}
                  onClick={() => onMove(index, index + 1)}
                  aria-label={`Đưa ${stop.name} xuống sau`}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={`${iconBtn} hover:border-danger hover:text-danger`}
                  onClick={() => onRemove(stop.id)}
                  aria-label={`Bỏ ${stop.name} khỏi lịch trình`}
                >
                  ✕
                </button>
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
