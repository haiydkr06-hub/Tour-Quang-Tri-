import type { BookingRecord } from '@/lib/booking/types';
import type { MonthlyStat } from './types';

/** Số liệu lịch sử giả lập trước khi hệ thống có đơn thật (khóa 'YYYY-MM') */
export const HISTORICAL_MONTHLY: Record<string, { count: number; revenue: number }> = {
  '2026-07': { count: 18, revenue: 15400000 },
  '2026-08': { count: 24, revenue: 21800000 },
  '2026-09': { count: 20, revenue: 18200000 },
  '2026-10': { count: 29, revenue: 26500000 },
};

const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

/**
 * Hàm thuần: thống kê số đơn & doanh thu theo tháng cho biểu đồ Admin (user story 5).
 * Gộp số liệu lịch sử với đơn thật (theo `createdAt`), bỏ đơn đã hủy,
 * trả về `monthsBack` tháng gần nhất tính đến tháng của `now`.
 */
export function buildMonthlyStats(
  bookings: BookingRecord[],
  now: Date,
  monthsBack = 5,
  history: Record<string, { count: number; revenue: number }> = HISTORICAL_MONTHLY,
): MonthlyStat[] {
  const totals = new Map<string, { count: number; revenue: number }>();
  for (const [key, value] of Object.entries(history)) totals.set(key, { ...value });

  for (const b of bookings) {
    if (b.status === 'cancelled') continue;
    const created = new Date(b.createdAt);
    if (Number.isNaN(created.getTime())) continue;
    const key = monthKey(created);
    const current = totals.get(key) ?? { count: 0, revenue: 0 };
    totals.set(key, { count: current.count + 1, revenue: current.revenue + b.totalPrice });
  }

  const result: MonthlyStat[] = [];
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = totals.get(monthKey(d)) ?? { count: 0, revenue: 0 };
    result.push({ month: `T${d.getMonth() + 1}`, ...value });
  }
  return result;
}
