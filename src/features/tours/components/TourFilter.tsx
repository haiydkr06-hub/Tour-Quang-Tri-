import type {
  FilterOption,
  TourCategory,
  TourDurationFilter,
  TourFilter as TourFilterType,
  TourSort,
} from '../types';
import { TextField } from '@/components/ui/TextField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { TourCategoryChips } from './TourCategoryChips';

const PRICE_MIN = 500000;
const PRICE_MAX = 2000000;

export interface TourFilterProps {
  filter: TourFilterType;
  locationOptions: string[];
  categoryOptions: FilterOption<TourCategory>[];
  durationOptions: FilterOption<TourDurationFilter>[];
  sortOptions: FilterOption<TourSort>[];
  /** Số tiêu chí lọc đang bật, hiện trên nút "Đặt lại" */
  activeCount: number;
  onChange: (nextFilter: TourFilterType) => void;
  onReset: () => void;
}

/** Thu hẹp giá trị chuỗi từ <select> về đúng kiểu của danh sách lựa chọn. */
function pickOption<T extends string>(options: FilterOption<T>[], value: string): T | undefined {
  return options.find((option) => option.value === value)?.value;
}

/**
 * Khối điều khiển Bộ lọc Tour: từ khóa, địa danh, giá tối đa, loại hình, thời lượng và sắp xếp.
 */
export function TourFilter({
  filter,
  locationOptions,
  categoryOptions,
  durationOptions,
  sortOptions,
  activeCount,
  onChange,
  onReset,
}: TourFilterProps) {
  const formatVND = (val: number) => `${val.toLocaleString('vi-VN')} đ`;

  return (
    <div className="rounded-3xl border border-border/80 bg-surface-card p-5 shadow-card sm:p-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <TextField
          label="Tìm kiếm tour"
          placeholder="Thành Cổ, Vịnh Mốc, Vĩ tuyến 17..."
          value={filter.searchQuery}
          onChange={(e) => onChange({ ...filter, searchQuery: e.target.value })}
        />

        <Select
          label="Điểm di tích"
          value={filter.selectedLocation}
          onChange={(e) => onChange({ ...filter, selectedLocation: e.target.value })}
          options={locationOptions.map((loc) => ({ value: loc, label: loc }))}
        />

        {/* Thanh trượt lọc giá tối đa */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="price-slider" className="text-sm font-semibold text-ink">
              Mức giá tối đa
            </label>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
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
            className="mt-2 h-2 w-full cursor-pointer accent-primary"
          />
          <div className="mt-1 flex justify-between text-[11px] text-ink-muted">
            <span>{formatVND(PRICE_MIN)}</span>
            <span>Không giới hạn</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <TourCategoryChips
          value={filter.category}
          options={categoryOptions}
          onChange={(category) => onChange({ ...filter, category })}
        />
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-end">
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-xl">
          <Select
            id="filter-duration"
            label="Thời lượng"
            value={filter.duration}
            onChange={(e) => onChange({ ...filter, duration: pickOption(durationOptions, e.target.value) ?? '' })}
            options={durationOptions}
          />
          <Select
            id="filter-sort"
            label="Sắp xếp theo"
            value={filter.sortBy}
            onChange={(e) => onChange({ ...filter, sortBy: pickOption(sortOptions, e.target.value) ?? '' })}
            options={sortOptions}
          />
        </div>
        <Button variant="ghost" size="sm" onClick={onReset} disabled={activeCount === 0 && filter.sortBy === ''}>
          Đặt lại bộ lọc{activeCount > 0 ? ` (${activeCount})` : ''}
        </Button>
      </div>
    </div>
  );
}
