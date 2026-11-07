import type { VehicleOption } from '../types';
import { Card } from '@/components/ui/Card';
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
            <Card
              key={v.id}
              onClick={() => onSelect(isSelected ? null : v.id)}
              className={`flex cursor-pointer flex-col justify-between p-4 transition-all ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : 'hover:border-border/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-ink">{v.name}</h3>
                  <Badge variant={isSelected ? 'primary' : 'neutral'}>
                    {v.seats} chỗ
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                  {v.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                <span className="font-bold text-primary">{formatVND(v.pricePerDay)}</span>
                <span className="text-[11px] font-medium text-ink">
                  {isSelected ? '✓ Đã chọn' : '+ Chọn'}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
