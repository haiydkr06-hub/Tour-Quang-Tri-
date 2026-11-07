import { z } from 'zod';
import type { BookingCustomerInfo } from './types';

const vietnamesePhoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;

/**
 * Zod Schema kiểm chứng biên giới dữ liệu biểu mẫu thanh toán đặt tour.
 */
export const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Họ và tên phải có ít nhất 3 ký tự')
    .max(100, 'Họ và tên không được vượt quá 100 ký tự'),

  email: z
    .string()
    .trim()
    .email('Địa chỉ email không đúng định dạng'),

  phone: z
    .string()
    .trim()
    .regex(vietnamesePhoneRegex, 'Số điện thoại không hợp lệ (cần 10 số, đầu 03, 05, 07, 08, 09)'),

  startDate: z
    .string()
    .min(1, 'Vui lòng chọn ngày khởi hành chuyến đi'),

  specialRequests: z
    .string()
    .trim()
    .max(500, 'Ghi chú đặc biệt không quá 500 ký tự')
    .optional(),

  paymentMethod: z.enum(['banking', 'cash', 'card'], {
    message: 'Vui lòng chọn phương thức thanh toán hợp lệ',
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export type ValidationResult =
  | { success: true; data: BookingCustomerInfo }
  | { success: false; errors: Record<string, string> };

/**
 * Hàm kiểm tra biên giới: nhận unknown và thu hẹp kiểu bằng Zod theo chuẩn AGENTS.md.
 */
export function validateCheckoutForm(input: unknown): ValidationResult {
  const result = checkoutFormSchema.safeParse(input);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const fieldName = issue.path[0];
    if (typeof fieldName === 'string' && !errors[fieldName]) {
      errors[fieldName] = issue.message;
    }
  }

  return {
    success: false,
    errors,
  };
}
