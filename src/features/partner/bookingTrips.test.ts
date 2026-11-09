import { describe, expect, it } from 'vitest';
import type { BookingRecord } from '@/lib/booking/types';
import { applyTripStatuses, PACKAGE_GUIDE_PAYOUT_PER_DAY, tripsFromBookings } from './bookingTrips';

type BookingOverrides = Partial<Omit<BookingRecord, 'cartItem'>> & {
  cartItem?: Partial<BookingRecord['cartItem']>;
};

function booking(overrides: BookingOverrides): BookingRecord {
  const { cartItem, ...rest } = overrides;
  return {
    id: 'QT-1',
    customer: {
      fullName: 'Nguyễn Văn An',
      email: 'an@example.com',
      phone: '0912345678',
      startDate: '2026-12-01',
      paymentMethod: 'cash',
    },
    totalPrice: 1000000,
    status: 'confirmed',
    createdAt: '2026-11-09T00:00:00.000Z',
    ...rest,
    cartItem: {
      type: 'custom',
      tourTitle: 'Tour Tuỳ Chỉnh',
      destinations: ['Thành Cổ Quảng Trị'],
      days: 2,
      guests: 3,
      basePrice: 0,
      guide: { id: 101, name: 'Nguyễn Văn Hùng', pricePerDay: 500000, rating: 4.9 },
      vehicle: { id: 'car-7', name: 'Xe 7 chỗ', seats: 7, pricePerDay: 900000 },
      totalPrice: 1000000,
      ...cartItem,
    },
  };
}

describe('tripsFromBookings (phân công chuyến cho Đối tác)', () => {
  it('đơn đã duyệt có HDV và xe → 1 chuyến HDV + 1 chuyến tài xế, thù lao theo số ngày', () => {
    const trips = tripsFromBookings([booking({})]);
    expect(trips.map((t) => [t.roleType, t.payout, t.status])).toEqual([
      ['guide', 1000000, 'assigned'],
      ['driver', 1800000, 'assigned'],
    ]);
    expect(trips.every((t) => t.bookingId === 'QT-1' && t.guestCount === 3)).toBe(true);
  });

  it('đơn chờ duyệt hoặc đã hủy chưa được phân công', () => {
    expect(tripsFromBookings([booking({ status: 'pending' }), booking({ status: 'cancelled' })])).toEqual([]);
  });

  it('tour trọn gói không chọn HDV vẫn có chuyến cho HDV với thù lao mặc định', () => {
    const trips = tripsFromBookings([booking({ cartItem: { type: 'package', guide: null, vehicle: null, days: 1 } })]);
    expect(trips).toHaveLength(1);
    expect(trips[0].payout).toBe(PACKAGE_GUIDE_PAYOUT_PER_DAY);
  });

  it('tour tự thiết kế không thuê HDV/xe thì không tạo chuyến', () => {
    expect(tripsFromBookings([booking({ cartItem: { guide: null, vehicle: null } })])).toEqual([]);
  });

  it('đơn đã hoàn thành → chuyến ở trạng thái hoàn thành', () => {
    expect(tripsFromBookings([booking({ status: 'completed' })])[0].status).toBe('completed');
  });

  it('áp trạng thái đối tác đã cập nhật', () => {
    const trips = tripsFromBookings([booking({})]);
    const updated = applyTripStatuses(trips, { [trips[0].id]: 'in_progress' });
    expect(updated.map((t) => t.status)).toEqual(['in_progress', 'assigned']);
  });
});
