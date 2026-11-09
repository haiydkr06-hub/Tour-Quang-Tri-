import { describe, expect, it } from 'vitest';
import { filterFromBookingWidget, filterFromParams, filterToParams } from './filterParams';

describe('Bộ lọc tour ↔ URL', () => {
  it('đọc bộ lọc từ URL và ép max sang số', () => {
    const filter = filterFromParams(new URLSearchParams('q=thanh%20co&loc=C%E1%BA%A7u%20Hi%E1%BB%81n%20L%C6%B0%C6%A1ng&max=900000'));
    expect(filter).toEqual({ searchQuery: 'thanh co', selectedLocation: 'Cầu Hiền Lương', maxPrice: 900000 });
  });

  it('bỏ qua giá trị max không hợp lệ', () => {
    expect(filterFromParams(new URLSearchParams('max=abc')).maxPrice).toBe(0);
    expect(filterFromParams(new URLSearchParams('max=-100')).maxPrice).toBe(0);
  });

  it('ghi ra URL gọn, bỏ các giá trị mặc định', () => {
    expect(filterToParams({ searchQuery: '  ', selectedLocation: 'Tất cả địa danh', maxPrice: 0 }).toString()).toBe('');
    expect(filterToParams({ searchQuery: 'vinh moc', selectedLocation: '', maxPrice: 700000 }).toString()).toBe(
      'q=vinh+moc&max=700000',
    );
  });

  it('đọc rồi ghi lại cho ra cùng bộ lọc (round-trip)', () => {
    const original = { searchQuery: 'cồn cỏ', selectedLocation: 'Đảo Cồn Cỏ', maxPrice: 1200000 };
    expect(filterFromParams(filterToParams(original))).toEqual(original);
  });

  it('chuyển ô tìm kiếm trang chủ thành bộ lọc', () => {
    const base = { departureDate: '2026-12-01', adults: 2, children: 0, tourType: 'all' };
    expect(filterFromBookingWidget({ ...base, destination: 'Thành Cổ Quảng Trị', priceRange: 'under-1m' })).toEqual({
      searchQuery: '',
      selectedLocation: 'Thành Cổ Quảng Trị',
      maxPrice: 1000000,
    });
    expect(filterFromBookingWidget({ ...base, destination: 'Tất cả địa danh', priceRange: 'all' })).toEqual({
      searchQuery: '',
      selectedLocation: '',
      maxPrice: 0,
    });
  });
});
