/**
 * Kiểu dữ liệu dùng chung cho luồng Đặt tour (giỏ hàng → thanh toán → quản trị).
 * Đặt ở tầng `lib` để các feature `cart`, `checkout`, `admin` cùng import
 * mà không phải gọi chéo vào nhau (đúng quy tắc một chiều trong AGENTS.md).
 */
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
  /** Tài khoản đã đặt (nếu khách đăng nhập khi thanh toán) — khớp thực thể Booking.userId trong PRD */
  userId?: string;
  cartItem: CartItem;
  customer: BookingCustomerInfo;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}
