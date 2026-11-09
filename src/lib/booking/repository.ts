import { z } from 'zod';
import type { BookingRecord, BookingStatus } from './types';

/**
 * Kho lưu đơn đặt tour giả lập, lưu bền vững bằng localStorage
 * (tải lại trang không mất đơn). Dữ liệu đọc từ storage là `unknown`
 * nên được kiểm chứng bằng Zod trước khi dùng.
 */
const BOOKINGS_KEY = 'qt_bookings';
const MY_BOOKING_IDS_KEY = 'qt_my_booking_ids';

const cartItemSchema = z.object({
  type: z.enum(['package', 'custom']),
  tourId: z.number().optional(),
  tourTitle: z.string(),
  destinations: z.array(z.string()),
  days: z.number(),
  guests: z.number(),
  basePrice: z.number(),
  guide: z
    .object({ id: z.number(), name: z.string(), pricePerDay: z.number(), rating: z.number() })
    .nullable()
    .optional(),
  vehicle: z
    .object({ id: z.string(), name: z.string(), seats: z.number(), pricePerDay: z.number() })
    .nullable()
    .optional(),
  totalPrice: z.number(),
});

const bookingSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  cartItem: cartItemSchema,
  customer: z.object({
    fullName: z.string(),
    email: z.string(),
    phone: z.string(),
    startDate: z.string(),
    specialRequests: z.string().optional(),
    paymentMethod: z.enum(['banking', 'cash', 'card']),
  }),
  totalPrice: z.number(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  createdAt: z.string(),
});

const SEED_BOOKINGS: BookingRecord[] = [
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

function readJson(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Trình duyệt ẩn danh / hết dung lượng: bỏ qua, dữ liệu chỉ sống trong phiên
  }
}

export function listBookings(): BookingRecord[] {
  const parsed = z.array(bookingSchema).safeParse(readJson(BOOKINGS_KEY));
  return parsed.success ? parsed.data : [...SEED_BOOKINGS];
}

function saveBookings(bookings: BookingRecord[]): void {
  writeJson(BOOKINGS_KEY, bookings);
}

export function addBooking(booking: BookingRecord): void {
  saveBookings([booking, ...listBookings()]);
  const ids = listMyBookingIds();
  writeJson(MY_BOOKING_IDS_KEY, [booking.id, ...ids.filter((id) => id !== booking.id)]);
}

export function changeBookingStatus(id: string, status: BookingStatus): boolean {
  const bookings = listBookings();
  const target = bookings.find((b) => b.id === id);
  if (!target) return false;
  saveBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
  return true;
}

/** Mã các đơn được đặt từ trình duyệt này (cho khách chưa đăng nhập xem lại đơn). */
export function listMyBookingIds(): string[] {
  const parsed = z.array(z.string()).safeParse(readJson(MY_BOOKING_IDS_KEY));
  return parsed.success ? parsed.data : [];
}
