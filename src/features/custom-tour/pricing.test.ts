import { describe, expect, it } from 'vitest';
import { calculateCustomTourPrice } from './pricing';

describe('calculateCustomTourPrice (thanh toán gộp Tour + HDV + Xe)', () => {
  it('cộng vé × số khách, HDV × số ngày, xe × số ngày', () => {
    const price = calculateCustomTourPrice({
      destinations: [{ entryFee: 40000 }, { entryFee: 0 }, { entryFee: 60000 }],
      guests: 3,
      days: 2,
      guide: { pricePerDay: 500000 },
      vehicle: { pricePerDay: 800000 },
    });
    expect(price).toEqual({ tickets: 300000, guide: 1000000, vehicle: 1600000, total: 2900000 });
  });

  it('không tính tiền HDV và xe khi khách không chọn', () => {
    const price = calculateCustomTourPrice({
      destinations: [{ entryFee: 50000 }],
      guests: 2,
      days: 3,
      guide: null,
      vehicle: null,
    });
    expect(price.total).toBe(100000);
    expect(price.guide).toBe(0);
    expect(price.vehicle).toBe(0);
  });

  it('lịch trình rỗng thì tiền vé bằng 0', () => {
    expect(
      calculateCustomTourPrice({ destinations: [], guests: 4, days: 1, guide: null, vehicle: null }).total,
    ).toBe(0);
  });
});
