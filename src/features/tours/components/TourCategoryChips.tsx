import type { FilterOption, TourCategory } from '../types';

export interface TourCategoryChipsProps {
  value: TourCategory | '';
  options: FilterOption<TourCategory>[];
  onChange: (next: TourCategory | '') => void;
}

/**
 * Hàng nút chọn nhanh loại hình tour. Mỗi nút là <button aria-pressed> để trình đọc màn hình
 * biết nút nào đang bật; bấm lại nút đang bật thì quay về "Tất cả".
 */
export function TourCategoryChips({ value, options, onChange }: TourCategoryChipsProps) {
  const chips: FilterOption<TourCategory | ''>[] = [{ value: '', label: 'Tất cả' }, ...options];

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">Loại hình tour</legend>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          const isActive = chip.value === value;
          return (
            <button
              key={chip.value || 'all'}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(isActive && chip.value !== '' ? '' : chip.value)}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                isActive
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30'
                  : 'border-border bg-surface-card text-ink-muted hover:border-primary/60 hover:text-primary'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
