import type { BookingWidgetData, TourFilter } from './types';

/** Bộ lọc mặc định: không giới hạn từ khóa, giá, địa danh */
export const EMPTY_TOUR_FILTER: TourFilter = { searchQuery: '', maxPrice: 0, selectedLocation: '' };

/**
 * Đọc bộ lọc từ URL (?q=&loc=&max=) — tham số URL luôn là chuỗi nên phải ép kiểu số.
 * Giá trị không hợp lệ được bỏ qua thay vì làm hỏng trang.
 */
export function filterFromParams(params: URLSearchParams): TourFilter {
  const max = Number(params.get('max'));
  return {
    searchQuery: params.get('q') ?? '',
    selectedLocation: params.get('loc') ?? '',
    maxPrice: Number.isFinite(max) && max > 0 ? max : 0,
  };
}

/** Ghi bộ lọc ra URL, bỏ các tham số đang ở giá trị mặc định để URL gọn. */
export function filterToParams(filter: TourFilter): URLSearchParams {
  const params = new URLSearchParams();
  if (filter.searchQuery.trim()) params.set('q', filter.searchQuery);
  if (filter.selectedLocation && filter.selectedLocation !== 'Tất cả địa danh') {
    params.set('loc', filter.selectedLocation);
  }
  if (filter.maxPrice > 0) params.set('max', String(filter.maxPrice));
  return params;
}

/** Chuyển dữ liệu ô tìm kiếm ở trang chủ thành bộ lọc của trang /tours. */
export function filterFromBookingWidget(data: BookingWidgetData): TourFilter {
  const maxByRange: Record<string, number> = { 'under-1m': 1000000, '1m-2m': 2000000 };
  return {
    searchQuery: '',
    selectedLocation: data.destination === 'Tất cả địa danh' ? '' : data.destination,
    maxPrice: maxByRange[data.priceRange] ?? 0,
  };
}
