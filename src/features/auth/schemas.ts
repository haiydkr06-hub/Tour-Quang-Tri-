import { z } from 'zod';
import type { LoginCredentials, RegisterData, ForgotPasswordData } from './types';

const vietnamesePhoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;

/**
 * Zod Schema xác thực biểu mẫu Đăng nhập.
 */
export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, 'Tên đăng nhập hoặc email phải có ít nhất 3 ký tự'),

  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),

  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Zod Schema xác thực biểu mẫu Đăng ký tài khoản CUSTOMER.
 */
export const registerSchema = z
  .object({
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
      .regex(vietnamesePhoneRegex, 'Số điện thoại không hợp lệ (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09)'),

    password: z
      .string()
      .min(6, 'Mật khẩu tối thiểu 6 ký tự')
      .regex(/[A-Za-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái')
      .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất một chữ số'),

    confirmPassword: z
      .string()
      .min(6, 'Vui lòng nhập lại mật khẩu xác nhận'),

    agreeTerms: z
      .boolean()
      .refine((val) => val === true, 'Bạn cần đồng ý với Điều khoản sử dụng & Quy định tham quan di tích Quảng Trị'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không trùng khớp',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Zod Schema xác thực biểu mẫu Quên mật khẩu.
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Vui lòng nhập địa chỉ email hợp lệ để nhận mã khôi phục'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export type SchemaValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

function extractZodErrors(issues: z.ZodIssue[]): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return errors;
}

/**
 * Kiểm tra dữ liệu biên giới Đăng nhập an toàn (nhận unknown -> thu hẹp bằng Zod).
 */
export function validateLoginForm(input: unknown): SchemaValidationResult<LoginCredentials> {
  const result = loginSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: extractZodErrors(result.error.issues) };
}

/**
 * Kiểm tra dữ liệu biên giới Đăng ký an toàn (nhận unknown -> thu hẹp bằng Zod).
 */
export function validateRegisterForm(input: unknown): SchemaValidationResult<RegisterData> {
  const result = registerSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: extractZodErrors(result.error.issues) };
}

/**
 * Kiểm tra dữ liệu biên giới Quên mật khẩu an toàn.
 */
export function validateForgotPasswordForm(input: unknown): SchemaValidationResult<ForgotPasswordData> {
  const result = forgotPasswordSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: extractZodErrors(result.error.issues) };
}
