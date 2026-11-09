import type { TourFilter as TourFilterType } from '../types';
import { TextField } from '@/components/ui/TextField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

const PRICE_MIN = 500000;
const PRICE_MAX = 2000000;

export interface TourFilterProps {
  filter: TourFilterType;
  locationOptions: string[];
  onChange: (nextFilter: TourFilterType) => void;
  onReset: () => void;
}

/**
 * Khối điều khiển Bộ lọc Tour (Từ khóa, Địa danh, Thanh trượt giá tiền).
 */
export function TourFilter({
  filter,
  locationOptions,
  onChange,
  onReset,
}: TourFilterProps) {
  const formatVND = (val: number) => `${val.toLocaleString('vi-VN')} đ`;

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-5 shadow-xs">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Tìm kiếm theo tên hoặc mô tả */}
        <TextField
          label="Tìm kiếm tour"
          placeholder="Thành Cổ, Vịnh Mốc, Vĩ tuyến 17..."
          value={filter.searchQuery}
          onChange={(e) => onChange({ ...filter, searchQuery: e.target.value })}
        />

        {/* Lọc theo địa danh di tích */}
        <Select
          label="Điểm di tích"
          value={filter.selectedLocation}
          onChange={(e) => onChange({ ...filter, selectedLocation: e.target.value })}
          options={locationOptions.map((loc) => ({
            value: loc,
            label: loc,
          }))}
        />

        {/* Thanh trượt lọc giá tối đa */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="price-slider" className="text-sm font-medium text-ink">
              Mức giá tối đa
            </label>
            <span className="text-xs font-bold text-primary">
              {filter.maxPrice > 0 ? formatVND(filter.maxPrice) : 'Tất cả giá'}
            </span>
          </div>
          <input
            id="price-slider"
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={50000}
            value={filter.maxPrice > 0 ? filter.maxPrice : PRICE_MAX}
            onChange={(e) => {
              const value = Number(e.target.value);
              // Kéo hết cỡ = không giới hạn giá (maxPrice 0)
              onChange({ ...filter, maxPrice: value >= PRICE_MAX ? 0 : value });
            }}
            className="w-full accent-primary cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-[11px] text-ink-muted">
            <span>{formatVND(PRICE_MIN)}</span>
            <span>Không giới hạn</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3 border-t border-border pt-3">
        <Button variant="ghost" size="sm" onClick={onReset}>
          Đặt lại bộ lọc
        </Button>
      </div>
    </div>
  );
}
