import type { CartItem } from '@/features/cart/types';

export type PaymentMethod = 'banking' | 'cash' | 'card';

export interface BookingCustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  specialRequests?: string;
  paymentMethod: PaymentMethod;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface BookingRecord {
  id: string;
  cartItem: CartItem;
  customer: BookingCustomerInfo;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}
