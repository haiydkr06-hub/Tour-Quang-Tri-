import { create } from 'zustand';
import type { CartState, CartItem } from './types';

export const useCartStore = create<CartState>((set) => ({
  item: null,
  setCartItem: (item: CartItem) => {
    set({ item });
  },
  clearCart: () => {
    set({ item: null });
  },
}));

/** Selector kiểm tra giỏ tour có dữ liệu hay không */
export const useHasCartItem = (): boolean => useCartStore((state) => state.item !== null);

/** Selector lấy tổng tiền giỏ hàng */
export const useCartTotal = (): number =>
  useCartStore((state) => state.item?.totalPrice ?? 0);
