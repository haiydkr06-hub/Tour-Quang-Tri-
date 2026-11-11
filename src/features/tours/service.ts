import type {
  Tour,
  TourFilter,
  TourCategory,
  TourDurationFilter,
  TourSort,
  FilterOption,
  TourTab,
  CarouselSlide,
  BookingWidgetData,
  DestinationHighlight,
  TourCollection,
  MapPoint,
  TourReview,
  TravelArticle,
} from './types';
import {
  MOCK_TOURS,
  CAROUSEL_SLIDES,
  DESTINATION_HIGHLIGHTS,
  THEMATIC_COLLECTIONS,
  QUANG_TRI_MAP_POINTS,
  CUSTOMER_REVIEWS,
  TRAVEL_ARTICLES,
} from './mockData';

export { MOCK_TOURS, CAROUSEL_SLIDES };

export const ALL_LOCATIONS = [
  'Tất cả địa danh',
  'Thành Cổ Quảng Trị',
  'Cầu Hiền Lương',
  'Địa đạo Vịnh Mốc',
  'Đảo Cồn Cỏ',
  'Sân bay Tà Cơn',
  'Căn cứ Khe Sanh',
  'Thánh địa La Vang',
];

export async function getCarouselSlides(): Promise<CarouselSlide[]> {
  await new Promise((r) => setTimeout(r, 20));
  return CAROUSEL_SLIDES;
}

export async function getDestinationOptions(): Promise<string[]> {
  await new Promise((r) => setTimeout(r, 20));
  return ALL_LOCATIONS.filter((loc) => loc !== 'Tất cả địa danh');
}

export async function getDestinationHighlights(): Promise<DestinationHighlight[]> {
  await new Promise((r) => setTimeout(r, 30));
  return DESTINATION_HIGHLIGHTS;
}

export async function getThematicCollections(): Promise<TourCollection[]> {
  await new Promise((r) => setTimeout(r, 30));
  return THEMATIC_COLLECTIONS;
}

export async function getMapPoints(): Promise<MapPoint[]> {
  await new Promise((r) => setTimeout(r, 20));
  return QUANG_TRI_MAP_POINTS;
}

export async function getCustomerReviews(): Promise<TourReview[]> {
  await new Promise((r) => setTimeout(r, 30));
  return CUSTOMER_REVIEWS;
}

export async function getTravelArticles(category?: string): Promise<TravelArticle[]> {
  await new Promise((r) => setTimeout(r, 30));
  if (!category || category === 'Tất cả') return TRAVEL_ARTICLES;
  return TRAVEL_ARTICLES.filter((a) => a.category === category);
}

/** Dịch vụ đã bao gồm trong mọi tour trọn gói (hiện ở trang chi tiết tour và dải cam kết trang chủ) */
export const TOUR_INCLUDED_SERVICES: { icon: 'bus' | 'ticket' | 'guide' | 'shield'; text: string }[] = [
  { icon: 'bus', text: 'Bao gồm xe đưa đón khứ hồi' },
  { icon: 'ticket', text: 'Bao gồm vé tham quan di tích' },
  { icon: 'guide', text: 'Hướng dẫn viên bản địa theo suốt tuyến' },
  { icon: 'shield', text: 'Bảo hiểm du lịch đầy đủ' },
];

/** Nhãn tiếng Việt cho từng loại hình tour */
export const TOUR_CATEGORY_LABELS: Record<TourCategory, string> = {
  history: 'Di tích lịch sử',
  beach: 'Biển đảo',
  ecotourism: 'Sinh thái',
  spiritual: 'Tâm linh',
  culture: 'Văn hóa',
  experience: 'Trải nghiệm',
};

/** Chỉ hiện loại hình đang có tour, để không có nút lọc nào luôn ra 0 kết quả */
export const TOUR_CATEGORY_OPTIONS: FilterOption<TourCategory>[] = (
  Object.keys(TOUR_CATEGORY_LABELS) as TourCategory[]
)
  .filter((cat) => MOCK_TOURS.some((tour) => tour.category === cat))
  .map((cat) => ({ value: cat, label: TOUR_CATEGORY_LABELS[cat] }));

export const TOUR_DURATION_OPTIONS: FilterOption<TourDurationFilter>[] = [
  { value: '', label: 'Tất cả thời lượng' },
  { value: 'single', label: 'Trong ngày' },
  { value: 'multi', label: 'Nhiều ngày' },
];

export const TOUR_SORT_OPTIONS: FilterOption<TourSort>[] = [
  { value: '', label: 'Mặc định' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
  { value: 'departure', label: 'Khởi hành sớm nhất' },
];

/** Số ngày của tour, đọc từ chuỗi "1 Ngày", "2 Ngày 1 Đêm"... */
function durationDays(duration: string): number {
  const days = parseInt(duration, 10);
  return Number.isFinite(days) ? days : 1;
}

function sortTours(tours: Tour[], sortBy: TourSort): Tour[] {
  const list = [...tours];
  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    case 'departure':
      // Tour chưa có ngày khởi hành xếp cuối; chuỗi YYYY-MM-DD so sánh được trực tiếp
      return list.sort((a, b) => (a.departureDate ?? '9999').localeCompare(b.departureDate ?? '9999'));
    default:
      return list;
  }
}

export async function getTours(filter?: TourFilter): Promise<Tour[]> {
  await new Promise((r) => setTimeout(r, 40));
  if (!filter) return MOCK_TOURS;

  const query = filter.searchQuery.trim().toLowerCase();
  const matched = MOCK_TOURS.filter((tour) => {
    const matchesSearch =
      query === '' ||
      tour.name.toLowerCase().includes(query) ||
      tour.description.toLowerCase().includes(query);
    const matchesPrice = filter.maxPrice <= 0 || tour.price <= filter.maxPrice;
    const matchesLocation =
      filter.selectedLocation === '' ||
      filter.selectedLocation === 'Tất cả địa danh' ||
      tour.locations.some((loc) => loc.includes(filter.selectedLocation));
    const matchesCategory = filter.category === '' || tour.category === filter.category;
    const days = durationDays(tour.duration);
    const matchesDuration =
      filter.duration === '' ||
      (filter.duration === 'single' && days <= 1) ||
      (filter.duration === 'multi' && days >= 2);
    return matchesSearch && matchesPrice && matchesLocation && matchesCategory && matchesDuration;
  });
  return sortTours(matched, filter.sortBy);
}

export async function getTourById(id: number): Promise<Tour | null> {
  await new Promise((r) => setTimeout(r, 30));
  return MOCK_TOURS.find((tour) => tour.id === id) ?? null;
}

export async function getToursByTab(
  tab: TourTab,
  sortByPrice: 'asc' | 'desc' | 'none' = 'none'
): Promise<Tour[]> {
  await new Promise((r) => setTimeout(r, 40));
  let list = MOCK_TOURS.filter((t) => t.tab === tab || (tab === 'featured' && t.isFeatured));
  if (list.length === 0) {
    list = MOCK_TOURS.slice(0, 4);
  }
  if (sortByPrice === 'asc') {
    return [...list].sort((a, b) => a.price - b.price);
  }
  if (sortByPrice === 'desc') {
    return [...list].sort((a, b) => b.price - a.price);
  }
  return list;
}

export async function filterToursByBooking(criteria: BookingWidgetData): Promise<Tour[]> {
  await new Promise((r) => setTimeout(r, 50));
  return MOCK_TOURS.filter((tour) => {
    const matchesDest =
      !criteria.destination ||
      criteria.destination === 'Tất cả địa danh' ||
      tour.locations.some((loc) =>
        loc.toLowerCase().includes(criteria.destination.toLowerCase())
      ) ||
      tour.name.toLowerCase().includes(criteria.destination.toLowerCase());

    const matchesType =
      !criteria.tourType ||
      criteria.tourType === 'all' ||
      tour.category === criteria.tourType;

    let matchesPrice = true;
    if (criteria.priceRange === 'under-1m') {
      matchesPrice = tour.price < 1000000;
    } else if (criteria.priceRange === '1m-2m') {
      matchesPrice = tour.price >= 1000000 && tour.price <= 2000000;
    } else if (criteria.priceRange === 'above-2m') {
      matchesPrice = tour.price > 2000000;
    }

    return matchesDest && matchesType && matchesPrice;
  });
}
