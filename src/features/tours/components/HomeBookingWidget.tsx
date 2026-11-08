import { useState } from 'react';
import type { BookingWidgetData } from '../types';
import { validateBookingWidget } from '../schemas';

export interface HomeBookingWidgetProps {
  destinationOptions: string[];
  onSearch: (data: BookingWidgetData) => void;
  isLoading?: boolean;
}

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
    <div className="w-full rounded-3xl border border-border bg-surface-card p-6 shadow-xl lg:max-w-md">
      <div className="mb-4">
        <h2 className="text-xl font-black text-ink flex items-center gap-2">
          <span>🎯</span> Tìm Tour Quảng Trị
        </h2>
        <p className="text-xs text-ink-muted">Khởi hành thuận tiện, lịch trình chuẩn xác</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label htmlFor="bw-dest" className="block text-xs font-semibold text-ink mb-1">
            Điểm đến mong muốn
          </label>
          <select
            id="bw-dest"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:border-primary focus:outline-none"
          >
            <option value="Tất cả địa danh">Tất cả địa danh nổi tiếng</option>
            {destinationOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.destination && <p className="text-[11px] text-red-500 mt-0.5">{errors.destination}</p>}
        </div>

        <div>
          <label htmlFor="bw-date" className="block text-xs font-semibold text-ink mb-1">
            Ngày khởi hành
          </label>
          <input
            id="bw-date"
            type="date"
            min={todayStr}
            value={formData.departureDate}
            onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:border-primary focus:outline-none"
          />
          {errors.departureDate && <p className="text-[11px] text-red-500 mt-0.5">{errors.departureDate}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="bw-adults" className="block text-xs font-semibold text-ink mb-1">
              Người lớn (≥ 12 tuổi)
            </label>
            <input
              id="bw-adults"
              type="number"
              min={1}
              max={50}
              value={formData.adults}
              onChange={(e) => setFormData({ ...formData, adults: Number(e.target.value) })}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:border-primary focus:outline-none"
            />
            {errors.adults && <p className="text-[11px] text-red-500 mt-0.5">{errors.adults}</p>}
          </div>

          <div>
            <label htmlFor="bw-children" className="block text-xs font-semibold text-ink mb-1">
              Trẻ em (&lt; 12 tuổi)
            </label>
            <input
              id="bw-children"
              type="number"
              min={0}
              max={50}
              value={formData.children}
              onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:border-primary focus:outline-none"
            />
            {errors.children && <p className="text-[11px] text-red-500 mt-0.5">{errors.children}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="bw-type" className="block text-xs font-semibold text-ink mb-1">
              Loại hình tour
            </label>
            <select
              id="bw-type"
              value={formData.tourType}
              onChange={(e) => setFormData({ ...formData, tourType: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:border-primary focus:outline-none"
            >
              <option value="all">Tất cả loại hình</option>
              <option value="history">Di tích lịch sử</option>
              <option value="beach">Biển đảo Cồn Cỏ</option>
              <option value="ecotourism">Sinh thái Khe Sanh</option>
              <option value="spiritual">Hành hương tâm linh</option>
            </select>
          </div>

          <div>
            <label htmlFor="bw-price" className="block text-xs font-semibold text-ink mb-1">
              Khoảng giá
            </label>
            <select
              id="bw-price"
              value={formData.priceRange}
              onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:border-primary focus:outline-none"
            >
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
          className="mt-2 w-full rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-md hover:bg-primary-dark transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? 'Đang tìm kiếm...' : '🔍 TÌM TOUR NGAY'}
        </button>
      </form>
    </div>
  );
}
