import type { HistoricalDestination, TourGuide, VehicleOption } from '../types';
import { calculateCustomTourPrice } from '../pricing';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export interface TourSummaryBarProps {
  selectedDestinations: HistoricalDestination[];
  selectedGuide: TourGuide | null;
  selectedVehicle: VehicleOption | null;
  days: number;
  guests: number;
  onDaysChange: (d: number) => void;
  onGuestsChange: (g: number) => void;
  onProceed: () => void;
}

/**
 * Thanh tổng kết chi phí và điều chỉnh thời gian, số người theo thời gian thực (Real-time).
 */
export function TourSummaryBar({
  selectedDestinations,
  selectedGuide,
  selectedVehicle,
  days,
  guests,
  onDaysChange,
  onGuestsChange,
  onProceed,
}: TourSummaryBarProps) {
  const formatVND = (v: number) => `${v.toLocaleString('vi-VN')} đ`;

  // Tính toán chi phí thời gian thực (dùng chung hàm thuần với bước tạo giỏ hàng)
  const {
    tickets: totalTickets,
    guide: totalGuide,
    vehicle: totalVehicle,
    total: grandTotal,
  } = calculateCustomTourPrice({
    destinations: selectedDestinations,
    guests,
    days,
    guide: selectedGuide,
    vehicle: selectedVehicle,
  });

  const isValid = selectedDestinations.length > 0 || selectedGuide !== null || selectedVehicle !== null;

  return (
    <Card className="sticky bottom-4 z-40 border-2 border-primary shadow-xl bg-surface-card">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 items-center">
        {/* Điều chỉnh số ngày & số người */}
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="block text-xs font-semibold text-ink-muted">Số ngày</span>
            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onDaysChange(days - 1)}
                disabled={days <= 1}
                className="h-7 w-7 rounded-md border border-border bg-surface text-sm font-bold text-ink hover:bg-surface-alt disabled:opacity-40 cursor-pointer"
              >
                -
              </button>
              <span className="w-6 text-center font-bold text-ink">{days}</span>
              <button
                type="button"
                onClick={() => onDaysChange(days + 1)}
                className="h-7 w-7 rounded-md border border-border bg-surface text-sm font-bold text-ink hover:bg-surface-alt cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <span className="block text-xs font-semibold text-ink-muted">Số khách</span>
            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onGuestsChange(guests - 1)}
                disabled={guests <= 1}
                className="h-7 w-7 rounded-md border border-border bg-surface text-sm font-bold text-ink hover:bg-surface-alt disabled:opacity-40 cursor-pointer"
              >
                -
              </button>
              <span className="w-6 text-center font-bold text-ink">{guests}</span>
              <button
                type="button"
                onClick={() => onGuestsChange(guests + 1)}
                className="h-7 w-7 rounded-md border border-border bg-surface text-sm font-bold text-ink hover:bg-surface-alt cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Bảng chi tiết chi phí */}
        <div className="lg:col-span-2 text-xs text-ink-muted space-y-1">
          <div className="flex justify-between">
            <span>Vé {selectedDestinations.length} điểm ({guests} khách):</span>
            <span className="font-semibold text-ink">{formatVND(totalTickets)}</span>
          </div>
          {selectedGuide ? (
            <div className="flex justify-between">
              <span>HDV {selectedGuide.name} ({days} ngày):</span>
              <span className="font-semibold text-ink">{formatVND(totalGuide)}</span>
            </div>
          ) : null}
          {selectedVehicle ? (
            <div className="flex justify-between">
              <span>Thuê {selectedVehicle.name} ({days} ngày):</span>
              <span className="font-semibold text-ink">{formatVND(totalVehicle)}</span>
            </div>
          ) : null}
        </div>

        {/* Tổng tiền & Nút Đặt Tour */}
        <div className="flex flex-col items-end justify-center">
          <div className="text-right">
            <span className="text-xs text-ink-muted">Tổng cộng dự tính:</span>
            <p className="text-2xl font-extrabold text-primary">
              {formatVND(grandTotal)}
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            disabled={!isValid}
            className="mt-2 w-full sm:w-auto"
            onClick={onProceed}
          >
            {isValid ? 'Tiến Hành Đặt Tour →' : 'Chọn điểm hoặc HDV / Xe'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
