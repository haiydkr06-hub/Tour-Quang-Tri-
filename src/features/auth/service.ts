import type {
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  AuthResponse,
  UserRole,
} from './types';
import {
  backendLogin,
  backendRegister,
  backendForgotPassword,
} from './backend';

export interface DemoAccountInfo {
  role: UserRole;
  label: string;
  email: string;
  password: string;
  description: string;
}

export const DEMO_ACCOUNTS: DemoAccountInfo[] = [
  {
    role: 'ADMIN',
    label: 'Quản trị viên',
    email: 'admin@quangtri.vn',
    password: 'admin123',
    description: 'Toàn quyền điều hành hệ thống và tour di tích',
  },
  {
    role: 'CUSTOMER',
    label: 'Khách du lịch',
    email: 'customer@quangtri.vn',
    password: 'customer123',
    description: 'Người đặt tour và tự thiết kế lịch trình',
  },
  {
    role: 'PARTNER',
    label: 'Đối tác lữ hành',
    email: 'partner@quangtri.vn',
    password: 'partner123',
    description: 'Đơn vị liên kết dịch vụ du lịch',
  },
  {
    role: 'GUIDE',
    label: 'Hướng dẫn viên',
    email: 'guide@quangtri.vn',
    password: 'guide123',
    description: 'HDV bản địa nhận lịch dẫn đoàn Thành Cổ, Vịnh Mốc',
  },
  {
    role: 'DRIVER',
    label: 'Tài xế vận chuyển',
    email: 'driver@quangtri.vn',
    password: 'driver123',
    description: 'Tài xế xe du lịch đón trả khách di tích',
  },
];

export async function loginApi(credentials: LoginCredentials): Promise<AuthResponse> {
  return backendLogin(credentials);
}

export async function registerApi(data: RegisterData): Promise<AuthResponse> {
  return backendRegister(data);
}

export async function forgotPasswordApi(
  data: ForgotPasswordData
): Promise<{ success: boolean; message: string }> {
  return backendForgotPassword(data);
}
