import { beforeEach, describe, expect, it } from 'vitest';
import { addBooking, changeBookingStatus, listBookings, listMyBookingIds } from './repository';
import type { BookingRecord } from './types';

const sample: BookingRecord = {
  id: 'QT-TEST-1',
  userId: 'u-1',
  cartItem: {
    type: 'custom',
    tourTitle: 'Tour Tuỳ Chỉnh (2 địa danh di tích)',
    destinations: ['Thành Cổ Quảng Trị', 'Cầu Hiền Lương'],
    days: 1,
    guests: 2,
    basePrice: 80000,
    guide: null,
    vehicle: null,
    totalPrice: 80000,
  },
  customer: {
    fullName: 'Nguyễn Văn An',
    email: 'an@example.com',
    phone: '0912345678',
    startDate: '2026-12-01',
    paymentMethod: 'cash',
  },
  totalPrice: 80000,
  status: 'pending',
  createdAt: '2026-11-09T00:00:00.000Z',
};

describe('Kho đơn đặt tour (localStorage)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('có sẵn dữ liệu mẫu khi chưa có gì trong storage', () => {
    expect(listBookings().length).toBeGreaterThan(0);
  });

  it('lưu đơn mới bền vững và ghi nhớ đơn của trình duyệt này', () => {
    addBooking(sample);
    expect(listBookings()[0]).toEqual(sample);
    expect(listMyBookingIds()).toEqual(['QT-TEST-1']);
    // Đọc lại thẳng từ localStorage như sau khi F5
    expect(JSON.parse(localStorage.getItem('qt_bookings') ?? '[]')[0].id).toBe('QT-TEST-1');
  });

  it('cập nhật trạng thái đơn (Admin duyệt)', () => {
    addBooking(sample);
    expect(changeBookingStatus('QT-TEST-1', 'confirmed')).toBe(true);
    expect(listBookings().find((b) => b.id === 'QT-TEST-1')?.status).toBe('confirmed');
    expect(changeBookingStatus('KHONG-CO', 'confirmed')).toBe(false);
  });

  it('dữ liệu hỏng trong storage không làm sập ứng dụng (Zod chặn ở biên giới)', () => {
    localStorage.setItem('qt_bookings', '{"khong":"phai mang"}');
    localStorage.setItem('qt_my_booking_ids', 'không phải JSON');
    expect(Array.isArray(listBookings())).toBe(true);
    expect(listMyBookingIds()).toEqual([]);
  });
});
