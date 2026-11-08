import { z } from 'zod';
import type { BookingWidgetData } from './types';

/**
 * Zod Schema xác thực dữ liệu thanh tìm kiếm Booking Widget tại Trang chủ.
 */
export const bookingWidgetSchema = z.object({
  destination: z
    .string()
    .trim()
    .min(1, 'Vui lòng chọn hoặc nhập điểm đến tại Quảng Trị'),

  departureDate: z
    .string()
    .min(1, 'Vui lòng chọn ngày khởi hành')
    .refine((dateStr) => {
      if (!dateStr) return false;
      const selected = new Date(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, 'Ngày khởi hành không được là ngày trong quá khứ'),

  adults: z
    .number()
    .int('Số người lớn phải là số nguyên')
    .min(1, 'Cần ít nhất 1 người lớn tham gia chuyến đi')
    .max(50, 'Số lượng tối đa là 50 người'),

  children: z
    .number()
    .int('Số trẻ em phải là số nguyên')
    .min(0, 'Số trẻ em không hợp lệ')
    .max(50, 'Số lượng tối đa là 50 trẻ em'),

  tourType: z
    .string()
    .min(1, 'Vui lòng chọn loại hình tour mong muốn'),

  priceRange: z
    .string()
    .min(1, 'Vui lòng chọn khoảng giá phù hợp'),
});

export type BookingWidgetFormInput = z.infer<typeof bookingWidgetSchema>;

export type BookingValidationResult =
  | { success: true; data: BookingWidgetData }
  | { success: false; errors: Record<string, string> };

/**
 * Kiểm chứng an toàn biên giới dữ liệu Booking Widget (nhận unknown -> Zod parse).
 */
export function validateBookingWidget(input: unknown): BookingValidationResult {
  const result = bookingWidgetSchema.safeParse(input);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return {
    success: false,
    errors,
  };
}
