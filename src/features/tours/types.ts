export interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  locations: string[];
  duration: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  highlights: string[];
  itinerary: Array<{
    time: string;
    activity: string;
  }>;
}

export interface TourFilter {
  searchQuery: string;
  maxPrice: number;
  selectedLocation: string;
}
