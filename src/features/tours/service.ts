import type { Tour, TourFilter, CarouselSlide, BookingWidgetData } from './types';
import { MOCK_TOURS, CAROUSEL_SLIDES } from './mockData';

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
  await new Promise((resolve) => setTimeout(resolve, 30));
  return CAROUSEL_SLIDES;
}

export async function getDestinationOptions(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  return ALL_LOCATIONS.filter((loc) => loc !== 'Tất cả địa danh');
}

export async function getTours(filter?: TourFilter): Promise<Tour[]> {
  await new Promise((resolve) => setTimeout(resolve, 60));
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
  await new Promise((resolve) => setTimeout(resolve, 50));
  return MOCK_TOURS.find((tour) => tour.id === id) ?? null;
}

export async function filterToursByBooking(criteria: BookingWidgetData): Promise<Tour[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));

  return MOCK_TOURS.filter((tour) => {
    // Lọc theo điểm đến
    const matchesDest =
      !criteria.destination ||
      criteria.destination === 'Tất cả địa danh' ||
      tour.locations.some((loc) =>
        loc.toLowerCase().includes(criteria.destination.toLowerCase())
      ) ||
      tour.name.toLowerCase().includes(criteria.destination.toLowerCase());

    // Lọc theo loại hình tour
    const matchesType =
      !criteria.tourType ||
      criteria.tourType === 'all' ||
      tour.category === criteria.tourType;

    // Lọc theo khoảng giá
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
