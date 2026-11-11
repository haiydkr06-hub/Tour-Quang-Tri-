import type { BookingWidgetData, TourCategory, TourDurationFilter, TourFilter, TourSort } from './types';

/** Bộ lọc mặc định: không giới hạn từ khóa, giá, địa danh, loại hình, thời lượng; thứ tự mặc định */
export const EMPTY_TOUR_FILTER: TourFilter = {
  searchQuery: '',
  maxPrice: 0,
  selectedLocation: '',
  category: '',
  duration: '',
  sortBy: '',
};

const CATEGORIES: readonly TourCategory[] = ['history', 'beach', 'ecotourism', 'spiritual', 'culture', 'experience'];
const DURATIONS: readonly TourDurationFilter[] = ['single', 'multi'];
const SORTS: readonly TourSort[] = ['price-asc', 'price-desc', 'rating', 'departure'];

/** Thu hẹp chuỗi bất kỳ (từ URL / form) về một giá trị hợp lệ, sai thì trả '' (= tất cả). */
function pick<T extends string>(allowed: readonly T[], value: string | null): T | '' {
  return allowed.find((item) => item === value) ?? '';
}

/**
 * Đọc bộ lọc từ URL (?q=&loc=&max=&cat=&dur=&sort=) — tham số URL luôn là chuỗi nên phải ép kiểu.
 * Giá trị không hợp lệ được bỏ qua thay vì làm hỏng trang.
 */
export function filterFromParams(params: URLSearchParams): TourFilter {
  const max = Number(params.get('max'));
  return {
    searchQuery: params.get('q') ?? '',
    selectedLocation: params.get('loc') ?? '',
    maxPrice: Number.isFinite(max) && max > 0 ? max : 0,
    category: pick(CATEGORIES, params.get('cat')),
    duration: pick(DURATIONS, params.get('dur')),
    sortBy: pick(SORTS, params.get('sort')),
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
  if (filter.category) params.set('cat', filter.category);
  if (filter.duration) params.set('dur', filter.duration);
  if (filter.sortBy) params.set('sort', filter.sortBy);
  return params;
}

/** Đếm số tiêu chí lọc đang bật (không tính sắp xếp) — để hiện trên nút "Đặt lại". */
export function countActiveFilters(filter: TourFilter): number {
  return [
    filter.searchQuery.trim() !== '',
    filter.selectedLocation !== '' && filter.selectedLocation !== 'Tất cả địa danh',
    filter.maxPrice > 0,
    filter.category !== '',
    filter.duration !== '',
  ].filter(Boolean).length;
}

/** Chuyển dữ liệu ô tìm kiếm ở trang chủ thành bộ lọc của trang /tours. */
export function filterFromBookingWidget(data: BookingWidgetData): TourFilter {
  const maxByRange: Record<string, number> = { 'under-1m': 1000000, '1m-2m': 2000000 };
  return {
    ...EMPTY_TOUR_FILTER,
    selectedLocation: data.destination === 'Tất cả địa danh' ? '' : data.destination,
    maxPrice: maxByRange[data.priceRange] ?? 0,
    category: pick(CATEGORIES, data.tourType),
  };
}
