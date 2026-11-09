import type { CartItem } from '@/lib/booking/types';
import {
  addBooking,
  changeBookingStatus,
  listBookings,
  listMyBookingIds,
} from '@/lib/booking/repository';
import type { BookingCustomerInfo, BookingRecord } from './types';

export async function createBooking(
  customer: BookingCustomerInfo,
  cartItem: CartItem,
  userId?: string
): Promise<BookingRecord> {
  await new Promise((r) => setTimeout(r, 120)); // Giả lập độ trễ mạng xử lý

  const newBooking: BookingRecord = {
    id: `QT-${Date.now().toString().slice(-6)}`,
    userId,
    cartItem,
    customer,
    totalPrice: cartItem.totalPrice,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  addBooking(newBooking);
  return newBooking;
}

/**
 * Đơn của người dùng hiện tại: theo tài khoản (userId / email) nếu đã đăng nhập,
 * cộng thêm các đơn được đặt từ chính trình duyệt này.
 */
export async function getMyBookings(
  user: { id: string; email: string } | null
): Promise<BookingRecord[]> {
  await new Promise((r) => setTimeout(r, 60));
  const localIds = new Set(listMyBookingIds());
  return listBookings().filter(
    (b) =>
      localIds.has(b.id) ||
      (user !== null &&
        (b.userId === user.id || b.customer.email.toLowerCase() === user.email.toLowerCase()))
  );
}

export async function getBookings(): Promise<BookingRecord[]> {
  await new Promise((r) => setTimeout(r, 60));
  return listBookings();
}

export async function updateBookingStatus(
  id: string,
  status: BookingRecord['status']
): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 60));
  return changeBookingStatus(id, status);
}
