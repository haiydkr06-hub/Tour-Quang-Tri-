import type { VehicleOption } from '../types';
import { Badge } from '@/components/ui/Badge';

export interface VehicleSelectorProps {
  vehicles: VehicleOption[];
  selectedVehicleId: string | null;
  onSelect: (id: string | null) => void;
}

/**
 * Thành phần chọn phương tiện xe di chuyển tham quan Quảng Trị.
 */
export function VehicleSelector({
  vehicles,
  selectedVehicleId,
  onSelect,
}: VehicleSelectorProps) {
  const formatVND = (v: number) => `${v.toLocaleString('vi-VN')} đ/ngày`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">
          3. Chọn phương tiện di chuyển (Tùy chọn)
        </h2>
        {selectedVehicleId !== null ? (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-xs text-ink-muted hover:text-danger cursor-pointer"
          >
            Tự túc phương tiện
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {vehicles.map((v) => {
          const isSelected = selectedVehicleId === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(isSelected ? null : v.id)}
              aria-pressed={isSelected}
              className={`flex cursor-pointer flex-col justify-between rounded-xl border bg-surface-card p-4 text-left shadow-xs transition-all focus-visible:outline-2 focus-visible:outline-primary ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span className="block">
                <span className="flex items-center justify-between">
                  <span className="block text-sm font-bold text-ink">{v.name}</span>
                  <Badge variant={isSelected ? 'primary' : 'neutral'}>
                    {v.seats} chỗ
                  </Badge>
                </span>
                <span className="block mt-2 text-xs text-ink-muted leading-relaxed">
                  {v.description}
                </span>
              </span>

              <span className="mt-4 flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                <span className="block font-bold text-primary">{formatVND(v.pricePerDay)}</span>
                <span className="block text-[11px] font-medium text-ink">
                  {isSelected ? '✓ Đã chọn' : '+ Chọn'}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
