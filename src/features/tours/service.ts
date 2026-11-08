import type {
  Tour,
  TourFilter,
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

export async function getTours(filter?: TourFilter): Promise<Tour[]> {
  await new Promise((r) => setTimeout(r, 40));
  if (!filter) return MOCK_TOURS;

  return MOCK_TOURS.filter((tour) => {
    const matchesSearch =
      filter.searchQuery.trim() === '' ||
      tour.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(filter.searchQuery.toLowerCase());
    const matchesPrice = filter.maxPrice <= 0 || tour.price <= filter.maxPrice;
    const matchesLocation =
      filter.selectedLocation === '' ||
      filter.selectedLocation === 'Tất cả địa danh' ||
      tour.locations.some((loc) => loc.includes(filter.selectedLocation));
    return matchesSearch && matchesPrice && matchesLocation;
  });
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
