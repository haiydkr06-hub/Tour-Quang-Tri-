export interface HistoricalDestination {
  id: string;
  name: string;
  region: string;
  description: string;
  entryFee: number;
  imageUrl: string;
  timeRequired: string;
}

export interface TourGuide {
  id: number;
  name: string;
  languages: string[];
  rating: number;
  reviewsCount: number;
  avatar: string;
  pricePerDay: number;
  specialty: string;
}

export interface VehicleOption {
  id: string;
  name: string;
  seats: number;
  pricePerDay: number;
  description: string;
}

export interface CustomTourConfig {
  destinations: HistoricalDestination[];
  days: number;
  guests: number;
  guide: TourGuide | null;
  vehicle: VehicleOption | null;
}
