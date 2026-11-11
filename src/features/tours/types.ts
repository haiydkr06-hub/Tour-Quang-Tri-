export interface ItineraryItem {
  time: string;
  activity: string;
}

export type TourCategory = 'history' | 'beach' | 'ecotourism' | 'spiritual' | 'culture' | 'experience';
export type TourTab = 'featured' | 'best_seller' | 'good_price' | 'latest';

export interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  locations: string[];
  duration: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  category?: TourCategory;
  tab?: TourTab;
  departureFrom?: string;
  availableSeats?: number;
  departureDate?: string;
  highlights: string[];
  itinerary: ItineraryItem[];
}

/** Thời lượng: '' = tất cả, 'single' = tour trong ngày, 'multi' = từ 2 ngày trở lên */
export type TourDurationFilter = '' | 'single' | 'multi';
/** Cách sắp xếp danh sách: '' = mặc định (thứ tự dữ liệu) */
export type TourSort = '' | 'price-asc' | 'price-desc' | 'rating' | 'departure';

export interface TourFilter {
  searchQuery: string;
  maxPrice: number;
  selectedLocation: string;
  /** '' = tất cả loại hình */
  category: TourCategory | '';
  duration: TourDurationFilter;
  sortBy: TourSort;
}

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  imageUrl: string;
  badge: string;
}

export interface BookingWidgetData {
  destination: string;
  departureDate: string;
  adults: number;
  children: number;
  tourType: string;
  priceRange: string;
}

export interface DestinationHighlight {
  id: string;
  name: string;
  category: TourCategory;
  categoryName: string;
  toursCount: number;
  imageUrl: string;
  description: string;
  tag: string;
}

export interface TourCollection {
  id: string;
  title: string;
  subtitle: string;
  toursCount: number;
  imageUrl: string;
  link: string;
}

export interface MapPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  imageUrl: string;
  tourId: number;
}

export interface TourReview {
  id: string;
  authorName: string;
  authorLocation: string;
  authorAvatar: string;
  rating: number;
  tourName: string;
  reviewDate: string;
  content: string;
}

export interface TravelArticle {
  id: string;
  title: string;
  category: 'Kinh nghiệm' | 'Ẩm thực' | 'Lưu trú' | 'Lễ hội';
  readTime: string;
  date: string;
  imageUrl: string;
  summary: string;
}
