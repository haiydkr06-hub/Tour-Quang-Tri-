export type CartItemType = 'package' | 'custom';

export interface SelectedGuide {
  id: number;
  name: string;
  pricePerDay: number;
  rating: number;
}

export interface SelectedVehicle {
  id: string;
  name: string;
  seats: number;
  pricePerDay: number;
}

export interface CartItem {
  type: CartItemType;
  tourId?: number;
  tourTitle: string;
  destinations: string[];
  days: number;
  guests: number;
  basePrice: number;
  guide?: SelectedGuide | null;
  vehicle?: SelectedVehicle | null;
  totalPrice: number;
}

export interface CartState {
  item: CartItem | null;
  setCartItem: (item: CartItem) => void;
  clearCart: () => void;
}
