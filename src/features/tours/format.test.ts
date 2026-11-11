import { describe, expect, it } from 'vitest';
import { discountPercent, formatTourDate, formatVND } from './format';

describe('Định dạng hiển thị tour', () => {
  it('định dạng tiền và ngày', () => {
    expect(formatVND(650000)).toBe(`${(650000).toLocaleString('vi-VN')}₫`);
    expect(formatTourDate('2026-11-15')).toBe('15/11/2026');
    expect(formatTourDate('sắp có lịch')).toBe('sắp có lịch');
  });

  it('tính % giảm giá, không có giá gốc thì trả null', () => {
    expect(discountPercent(650000, 850000)).toBe(24);
    expect(discountPercent(650000)).toBeNull();
    expect(discountPercent(900000, 800000)).toBeNull();
  });
});
