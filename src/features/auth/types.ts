/**
 * 5 Vai trò phân quyền (RBAC) chính thức trong hệ thống:
 * 1. ADMIN: Quản trị viên toàn hệ thống
 * 2. CUSTOMER: Khách tham quan đặt tour
 * 3. PARTNER: Đối tác du lịch liên kết
 * 4. GUIDE: Hướng dẫn viên bản địa Quảng Trị
 * 5. DRIVER: Tài xế vận chuyển du khách
 */
export type UserRole = 'ADMIN' | 'CUSTOMER' | 'PARTNER' | 'GUIDE' | 'DRIVER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
}

export interface StoredUser extends User {
  passwordHash: string;
}

export interface LoginCredentials {
  identifier: string; // Email hoặc Tên đăng nhập
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  agreeTerms: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message: string;
}

export interface AuthState {
  user: User | null;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}
