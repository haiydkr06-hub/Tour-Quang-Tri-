import type { BookingRecord } from '@/lib/booking/types';
import type { PartnerTrip, TripStatus } from './types';

/** Thù lao mặc định cho HDV tour trọn gói (tour gói không chọn HDV cụ thể) */
export const PACKAGE_GUIDE_PAYOUT_PER_DAY = 500000;

/**
 * Hàm thuần: chuyển các đơn đặt tour ĐÃ ĐƯỢC ADMIN DUYỆT thành chuyến của Đối tác (user story 3).
 * - Đơn có thuê HDV (hoặc tour trọn gói) → 1 chuyến cho HDV.
 * - Đơn có thuê xe → 1 chuyến cho Tài xế.
 * Đơn chờ duyệt / đã hủy chưa được phân công nên không xuất hiện.
 */
export function tripsFromBookings(bookings: BookingRecord[]): PartnerTrip[] {
  const trips: PartnerTrip[] = [];

  for (const b of bookings) {
    if (b.status !== 'confirmed' && b.status !== 'completed') continue;
    const { cartItem, customer } = b;
    const base = {
      tourTitle: cartItem.tourTitle,
      destinations: cartItem.destinations,
      customerName: customer.fullName,
      customerPhone: customer.phone,
      guestCount: cartItem.guests,
      startDate: customer.startDate,
      days: cartItem.days,
      status: (b.status === 'completed' ? 'completed' : 'assigned') as TripStatus,
      specialNotes: customer.specialRequests || undefined,
      bookingId: b.id,
    };

    const guidePayPerDay = cartItem.guide?.pricePerDay ?? (cartItem.type === 'package' ? PACKAGE_GUIDE_PAYOUT_PER_DAY : 0);
    if (guidePayPerDay > 0) {
      trips.push({ ...base, id: `TRIP-${b.id}-HDV`, roleType: 'guide', payout: guidePayPerDay * cartItem.days });
    }
    if (cartItem.vehicle) {
      trips.push({
        ...base,
        id: `TRIP-${b.id}-XE`,
        roleType: 'driver',
        payout: cartItem.vehicle.pricePerDay * cartItem.days,
        specialNotes: [`Xe: ${cartItem.vehicle.name}`, base.specialNotes].filter(Boolean).join(' · '),
      });
    }
  }

  return trips;
}

/** Áp trạng thái đối tác đã cập nhật (đang đi / hoàn thành / hủy) lên danh sách chuyến. */
export function applyTripStatuses(trips: PartnerTrip[], statuses: Record<string, TripStatus>): PartnerTrip[] {
  return trips.map((t) => (statuses[t.id] ? { ...t, status: statuses[t.id] } : t));
}
