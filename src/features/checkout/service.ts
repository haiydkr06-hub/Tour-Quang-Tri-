import type { CartItem } from '@/features/cart/types';
import type { BookingCustomerInfo, BookingRecord } from './types';

// Bộ nhớ giả lập lưu trữ các đơn đặt tour
let BOOKING_STORE: BookingRecord[] = [
  {
    id: 'QT-2026-081',
    cartItem: {
      type: 'package',
      tourTitle: 'Ký ức 81 Ngày Đêm — Thành Cổ Quảng Trị',
      destinations: ['Thành Cổ Quảng Trị', 'Sông Thạch Hãn'],
      days: 1,
      guests: 2,
      basePrice: 650000,
      totalPrice: 1300000,
    },
    customer: {
      fullName: 'Trần Minh Đức',
      email: 'duc.tran@example.com',
      phone: '0912345678',
      startDate: '2026-11-15',
      specialRequests: 'Đoàn có cựu chiến binh cao tuổi',
      paymentMethod: 'banking',
    },
    totalPrice: 1300000,
    status: 'confirmed',
    createdAt: '2026-11-06T10:30:00.000Z',
  },
];

export async function createBooking(
  customer: BookingCustomerInfo,
  cartItem: CartItem
): Promise<BookingRecord> {
  await new Promise((r) => setTimeout(r, 120)); // Giả lập độ trễ mạng xử lý

  const newBooking: BookingRecord = {
    id: `QT-${Date.now().toString().slice(-6)}`,
    cartItem,
    customer,
    totalPrice: cartItem.totalPrice,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  BOOKING_STORE = [newBooking, ...BOOKING_STORE];
  return newBooking;
}

export async function getBookings(): Promise<BookingRecord[]> {
  await new Promise((r) => setTimeout(r, 60));
  return [...BOOKING_STORE];
}

export async function updateBookingStatus(
  id: string,
  status: BookingRecord['status']
): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 60));
  const target = BOOKING_STORE.find((b) => b.id === id);
  if (target) {
    target.status = status;
    return true;
  }
  return false;
}
