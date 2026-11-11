import { describe, expect, it } from 'vitest';
import { MOCK_TOURS, TOUR_CATEGORY_OPTIONS, getTours } from './service';
import { EMPTY_TOUR_FILTER } from './filterParams';
import type { TourFilter } from './types';

const make = (patch: Partial<TourFilter>): TourFilter => ({ ...EMPTY_TOUR_FILTER, ...patch });

describe('getTours — lọc và sắp xếp', () => {
  it('không lọc thì trả đủ tour theo thứ tự dữ liệu', async () => {
    expect((await getTours(EMPTY_TOUR_FILTER)).map((t) => t.id)).toEqual(MOCK_TOURS.map((t) => t.id));
  });

  it('lọc theo loại hình', async () => {
    const tours = await getTours(make({ category: 'beach' }));
    expect(tours.length).toBeGreaterThan(0);
    expect(tours.every((t) => t.category === 'beach')).toBe(true);
  });

  it('lọc theo thời lượng: trong ngày và nhiều ngày tách rời, cộng lại đủ', async () => {
    const single = await getTours(make({ duration: 'single' }));
    const multi = await getTours(make({ duration: 'multi' }));
    expect(single.every((t) => parseInt(t.duration, 10) === 1)).toBe(true);
    expect(multi.every((t) => parseInt(t.duration, 10) >= 2)).toBe(true);
    expect(single.length + multi.length).toBe(MOCK_TOURS.length);
  });

  it('kết hợp nhiều tiêu chí', async () => {
    const tours = await getTours(make({ category: 'beach', duration: 'multi' }));
    expect(tours.every((t) => t.category === 'beach' && parseInt(t.duration, 10) >= 2)).toBe(true);
  });

  it('sắp xếp theo giá, đánh giá và ngày khởi hành', async () => {
    const asc = (await getTours(make({ sortBy: 'price-asc' }))).map((t) => t.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const desc = (await getTours(make({ sortBy: 'price-desc' }))).map((t) => t.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
    const rating = (await getTours(make({ sortBy: 'rating' }))).map((t) => t.rating);
    expect(rating).toEqual([...rating].sort((a, b) => b - a));
    const dates = (await getTours(make({ sortBy: 'departure' }))).map((t) => t.departureDate ?? '9999');
    expect(dates).toEqual([...dates].sort());
  });

  it('chỉ hiện nút loại hình đang có tour', () => {
    for (const option of TOUR_CATEGORY_OPTIONS) {
      expect(MOCK_TOURS.some((t) => t.category === option.value)).toBe(true);
    }
  });
});
