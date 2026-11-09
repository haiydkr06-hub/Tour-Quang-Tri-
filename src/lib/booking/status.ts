import type { BookingStatus } from './types';

/** Nhãn hiển thị và màu Badge cho từng trạng thái đơn — dùng chung cho Admin và Khách. */
export const BOOKING_STATUS_BADGE: Record<
  BookingStatus,
  { variant: 'warning' | 'primary' | 'success' | 'danger'; text: string }
> = {
  pending: { variant: 'warning', text: 'Chờ duyệt' },
  confirmed: { variant: 'primary', text: 'Đã xác nhận' },
  completed: { variant: 'success', text: 'Đã hoàn thành' },
  cancelled: { variant: 'danger', text: 'Đã hủy' },
};
