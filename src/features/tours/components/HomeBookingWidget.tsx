import { useState } from 'react';
import type { BookingWidgetData } from '../types';
import { validateBookingWidget } from '../schemas';

export interface HomeBookingWidgetProps {
  destinationOptions: string[];
  onSearch: (data: BookingWidgetData) => void;
  isLoading?: boolean;
}

const labelClass = 'mb-1.5 block text-xs font-semibold text-ink-muted';
const fieldClass =
  'h-11 w-full rounded-xl border border-border bg-surface px-3 text-[13px] font-medium text-ink sm:px-3.5 sm:text-sm transition-all focus:border-primary focus:bg-surface-card focus:ring-4 focus:ring-primary/15 focus:outline-hidden';
const errorClass = 'mt-1 text-[11px] font-medium text-danger';

export function HomeBookingWidget({
  destinationOptions,
  onSearch,
  isLoading = false,
}: HomeBookingWidgetProps) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState<BookingWidgetData>({
    destination: 'Tất cả địa danh',
    departureDate: todayStr,
    adults: 2,
    children: 0,
    tourType: 'all',
    priceRange: 'all',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateBookingWidget(formData);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    onSearch(result.data);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[28px] border border-border/80 bg-surface-card p-6 shadow-card-hover sm:p-7">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-light to-primary" />

      <div className="mb-5 flex items-start gap-3">
        <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
          </svg>
        </span>
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-ink">Tìm Tour Quảng Trị</h2>
          <p className="text-xs text-ink-muted">Khởi hành thuận tiện, lịch trình chuẩn xác</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bw-dest" className={labelClass}>Điểm đến</label>
          <select
            id="bw-dest"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className={`${fieldClass} cursor-pointer`}
          >
            <option value="Tất cả địa danh">Tất cả địa danh nổi tiếng</option>
            {destinationOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          {errors.destination && <p className={errorClass}>{errors.destination}</p>}
        </div>

        <div>
          <label htmlFor="bw-date" className={labelClass}>Ngày khởi hành</label>
          <input
            id="bw-date"
            type="date"
            min={todayStr}
            value={formData.departureDate}
            onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
            className={fieldClass}
          />
          {errors.departureDate && <p className={errorClass}>{errors.departureDate}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="bw-adults" className={labelClass}>Người lớn (≥12t)</label>
            <input
              id="bw-adults"
              type="number"
              min={1}
              max={50}
              value={formData.adults}
              onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
              className={fieldClass}
            />
            {errors.adults && <p className={errorClass}>{errors.adults}</p>}
          </div>
          <div>
            <label htmlFor="bw-children" className={labelClass}>Trẻ em (&lt;12t)</label>
            <input
              id="bw-children"
              type="number"
              min={0}
              max={50}
              value={formData.children}
              onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
              className={fieldClass}
            />
            {errors.children && <p className={errorClass}>{errors.children}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="bw-type" className={labelClass}>Loại hình tour</label>
            <select id="bw-type" value={formData.tourType} onChange={(e) => setFormData({ ...formData, tourType: e.target.value })} className={`${fieldClass} cursor-pointer`}>
              <option value="all">Tất cả loại hình</option>
              <option value="history">Di tích lịch sử</option>
              <option value="beach">Biển đảo Cồn Cỏ</option>
              <option value="ecotourism">Sinh thái Khe Sanh</option>
              <option value="spiritual">Hành hương tâm linh</option>
            </select>
          </div>
          <div>
            <label htmlFor="bw-price" className={labelClass}>Khoảng giá</label>
            <select id="bw-price" value={formData.priceRange} onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })} className={`${fieldClass} cursor-pointer`}>
              <option value="all">Tất cả mức giá</option>
              <option value="under-1m">Dưới 1 triệu</option>
              <option value="1m-2m">1 - 2 triệu</option>
              <option value="above-2m">Trên 2 triệu</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold tracking-wide text-primary-foreground shadow-md shadow-primary/30 transition-all hover:-translate-y-px hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? 'Đang tìm kiếm...' : '🔍 TÌM TOUR NGAY'}
        </button>
      </form>
    </div>
  );
}
