import type { CartItem } from '@/lib/booking/types';

export type { CartItemType, SelectedGuide, SelectedVehicle, CartItem } from '@/lib/booking/types';

export interface CartState {
  item: CartItem | null;
  setCartItem: (item: CartItem) => void;
  clearCart: () => void;
}
