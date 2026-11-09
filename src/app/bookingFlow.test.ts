import { beforeEach, describe, expect, it } from 'vitest';
import { createBooking, getMyBookings } from '@/features/checkout/service';
import { getAdminStats, setBookingStatus } from '@/features/admin/service';
import { getPartnerTrips, updatePartnerTripStatus } from '@/features/partner/service';
import type { CartItem } from '@/lib/booking/types';

/**
 * Kiểm thử tích hợp luồng nghiệp vụ xuyên 3 vai trò:
 * Khách đặt tour → Admin duyệt → HDV/Tài xế thấy chuyến → hoàn thành → Khách thấy đơn hoàn thành.
 */
const cart: CartItem = {
  type: 'custom',
  tourTitle: 'Tour Tuỳ Chỉnh (2 địa danh di tích)',
  destinations: ['Thành Cổ Quảng Trị', 'Địa đạo Vịnh Mốc'],
  days: 2,
  guests: 4,
  basePrice: 160000,
  guide: { id: 101, name: 'Nguyễn Văn Hùng', pricePerDay: 500000, rating: 4.9 },
  vehicle: { id: 'car-7', name: 'Xe 7 chỗ', seats: 7, pricePerDay: 900000 },
  totalPrice: 2960000,
};

const customer = {
  fullName: 'Hoàng Hải Yến',
  email: 'customer@quangtri.vn',
  phone: '0912000002',
  startDate: '2026-12-20',
  paymentMethod: 'banking' as const,
};

describe('Luồng đặt tour xuyên vai trò', () => {
  beforeEach(() => localStorage.clear());

  it('Khách → Admin → Đối tác → Khách', async () => {
    const booking = await createBooking(customer, cart, 'u-cust-1');
    const statsBefore = await getAdminStats();

    // Chưa duyệt: đối tác chưa thấy chuyến
    expect((await getPartnerTrips()).some((t) => t.bookingId === booking.id)).toBe(false);

    // Admin duyệt
    await setBookingStatus(booking.id, 'confirmed');
    const trips = (await getPartnerTrips()).filter((t) => t.bookingId === booking.id);
    expect(trips.map((t) => t.roleType).sort()).toEqual(['driver', 'guide']);

    // HDV báo hoàn thành → đơn của khách hoàn thành
    const guideTrip = trips.find((t) => t.roleType === 'guide');
    expect(guideTrip).toBeDefined();
    await updatePartnerTripStatus(guideTrip!.id, 'completed');

    const mine = await getMyBookings({ id: 'u-cust-1', email: 'customer@quangtri.vn' });
    expect(mine.find((b) => b.id === booking.id)?.status).toBe('completed');

    // Đơn mới được tính vào thống kê Admin
    expect(statsBefore.monthlyStats.at(-1)!.revenue).toBeGreaterThanOrEqual(cart.totalPrice);
  });

  it('Admin hủy đơn → không phân công cho đối tác', async () => {
    const booking = await createBooking(customer, cart);
    await setBookingStatus(booking.id, 'cancelled');
    expect((await getPartnerTrips()).some((t) => t.bookingId === booking.id)).toBe(false);
  });
});
