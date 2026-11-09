import { describe, expect, it } from 'vitest';
import type { BookingRecord } from '@/lib/booking/types';
import { buildMonthlyStats } from './stats';

const make = (createdAt: string, totalPrice: number, status: BookingRecord['status'] = 'confirmed') =>
  ({ createdAt, totalPrice, status }) as BookingRecord;

describe('buildMonthlyStats (biểu đồ đặt tour của Admin)', () => {
  const history = { '2026-09': { count: 10, revenue: 5000000 } };
  const now = new Date(2026, 10, 15); // 15/11/2026

  it('trả về đúng số tháng gần nhất, theo thứ tự thời gian', () => {
    expect(buildMonthlyStats([], now, 3, history).map((m) => m.month)).toEqual(['T9', 'T10', 'T11']);
  });

  it('gộp lịch sử với đơn thật và bỏ đơn đã hủy', () => {
    const stats = buildMonthlyStats(
      [
        make('2026-11-02T08:00:00', 1300000),
        make('2026-11-05T08:00:00', 700000),
        make('2026-11-06T08:00:00', 999999, 'cancelled'),
        make('2026-09-20T08:00:00', 1000000),
      ],
      now,
      3,
      history,
    );
    expect(stats).toEqual([
      { month: 'T9', count: 11, revenue: 6000000 },
      { month: 'T10', count: 0, revenue: 0 },
      { month: 'T11', count: 2, revenue: 2000000 },
    ]);
  });

  it('xử lý qua năm mới và bỏ qua ngày không hợp lệ', () => {
    const stats = buildMonthlyStats(
      [make('2027-01-03T08:00:00', 500000), make('ngay-sai', 100)],
      new Date(2027, 0, 10),
      3,
      {},
    );
    expect(stats.map((m) => `${m.month}:${m.count}`)).toEqual(['T11:0', 'T12:0', 'T1:1']);
  });
});
