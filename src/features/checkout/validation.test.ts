import { describe, expect, it } from 'vitest';
import { validateCheckoutForm } from './validation';

const validInput = {
  fullName: 'Nguyễn Văn An',
  email: 'an@example.com',
  phone: '0912345678',
  startDate: '2026-12-01',
  specialRequests: '',
  paymentMethod: 'banking',
};

describe('validateCheckoutForm (Zod tại biên giới)', () => {
  it('chấp nhận dữ liệu hợp lệ', () => {
    const result = validateCheckoutForm(validInput);
    expect(result.success).toBe(true);
  });

  it('báo lỗi theo từng trường', () => {
    const result = validateCheckoutForm({
      ...validInput,
      fullName: 'A',
      email: 'khong-phai-email',
      phone: '12345',
      startDate: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.errors).sort()).toEqual(['email', 'fullName', 'phone', 'startDate']);
    }
  });

  it('từ chối phương thức thanh toán lạ và dữ liệu không phải object', () => {
    expect(validateCheckoutForm({ ...validInput, paymentMethod: 'bitcoin' }).success).toBe(false);
    expect(validateCheckoutForm(null).success).toBe(false);
    expect(validateCheckoutForm('chuỗi bất kỳ').success).toBe(false);
  });
});
