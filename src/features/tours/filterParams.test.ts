import { describe, expect, it } from 'vitest';
import {
  EMPTY_TOUR_FILTER,
  countActiveFilters,
  filterFromBookingWidget,
  filterFromParams,
  filterToParams,
} from './filterParams';
import type { TourFilter } from './types';

const make = (patch: Partial<TourFilter>): TourFilter => ({ ...EMPTY_TOUR_FILTER, ...patch });

describe('Bộ lọc tour ↔ URL', () => {
  it('đọc bộ lọc từ URL và ép max sang số', () => {
    const filter = filterFromParams(new URLSearchParams('q=thanh%20co&loc=C%E1%BA%A7u%20Hi%E1%BB%81n%20L%C6%B0%C6%A1ng&max=900000'));
    expect(filter).toEqual(make({ searchQuery: 'thanh co', selectedLocation: 'Cầu Hiền Lương', maxPrice: 900000 }));
  });

  it('bỏ qua giá trị max không hợp lệ', () => {
    expect(filterFromParams(new URLSearchParams('max=abc')).maxPrice).toBe(0);
    expect(filterFromParams(new URLSearchParams('max=-100')).maxPrice).toBe(0);
  });

  it('đọc loại hình, thời lượng, sắp xếp và bỏ qua giá trị lạ', () => {
    expect(filterFromParams(new URLSearchParams('cat=beach&dur=multi&sort=price-asc'))).toEqual(
      make({ category: 'beach', duration: 'multi', sortBy: 'price-asc' }),
    );
    expect(filterFromParams(new URLSearchParams('cat=xyz&dur=3&sort=hack'))).toEqual(EMPTY_TOUR_FILTER);
  });

  it('ghi ra URL gọn, bỏ các giá trị mặc định', () => {
    expect(filterToParams(make({ searchQuery: '  ', selectedLocation: 'Tất cả địa danh' })).toString()).toBe('');
    expect(filterToParams(make({ searchQuery: 'vinh moc', maxPrice: 700000 })).toString()).toBe(
      'q=vinh+moc&max=700000',
    );
    expect(filterToParams(make({ category: 'history', duration: 'single', sortBy: 'rating' })).toString()).toBe(
      'cat=history&dur=single&sort=rating',
    );
  });

  it('đọc rồi ghi lại cho ra cùng bộ lọc (round-trip)', () => {
    const original = make({
      searchQuery: 'cồn cỏ',
      selectedLocation: 'Đảo Cồn Cỏ',
      maxPrice: 1200000,
      category: 'beach',
      duration: 'multi',
      sortBy: 'departure',
    });
    expect(filterFromParams(filterToParams(original))).toEqual(original);
  });

  it('đếm số tiêu chí lọc đang bật (không tính sắp xếp)', () => {
    expect(countActiveFilters(EMPTY_TOUR_FILTER)).toBe(0);
    expect(countActiveFilters(make({ sortBy: 'price-desc' }))).toBe(0);
    expect(countActiveFilters(make({ category: 'beach', duration: 'single', maxPrice: 900000 }))).toBe(3);
  });

  it('chuyển ô tìm kiếm trang chủ thành bộ lọc, giữ cả loại hình tour', () => {
    const base = { departureDate: '2026-12-01', adults: 2, children: 0, tourType: 'all' };
    expect(filterFromBookingWidget({ ...base, destination: 'Thành Cổ Quảng Trị', priceRange: 'under-1m' })).toEqual(
      make({ selectedLocation: 'Thành Cổ Quảng Trị', maxPrice: 1000000 }),
    );
    expect(filterFromBookingWidget({ ...base, destination: 'Tất cả địa danh', priceRange: 'all' })).toEqual(
      EMPTY_TOUR_FILTER,
    );
    expect(
      filterFromBookingWidget({ ...base, tourType: 'spiritual', destination: 'Tất cả địa danh', priceRange: 'all' }),
    ).toEqual(make({ category: 'spiritual' }));
  });
});
