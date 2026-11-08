import { create } from 'zustand';
import type { AuthState, User, UserRole } from './types';

const TOKEN_STORAGE_KEY = 'phu_xuan_token';
const USER_STORAGE_KEY = 'phu_xuan_user';

const getInitialUser = (): User | null => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

const getInitialToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

const initialUser = getInitialUser();
const initialToken = getInitialToken();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  role: initialUser?.role ?? null,
  token: initialToken,
  isAuthenticated: Boolean(initialUser && initialToken),

  login: (user: User, token: string) => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch {
      // Bỏ qua lỗi lưu trữ trên trình duyệt ẩn danh
    }
    set({
      user,
      role: user.role,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // Bỏ qua lỗi
    }
    set({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

/** Selector kiểm tra quyền Quản trị viên (ADMIN) */
export const useIsAdmin = (): boolean =>
  useAuthStore((state) => state.role === 'ADMIN');

/** Selector kiểm tra quyền Đối tác (PARTNER, GUIDE, DRIVER) */
export const useIsPartner = (): boolean =>
  useAuthStore((state) =>
    state.role === 'PARTNER' || state.role === 'GUIDE' || state.role === 'DRIVER'
  );

/** Selector kiểm tra quyền Khách hàng (CUSTOMER) */
export const useIsCustomer = (): boolean =>
  useAuthStore((state) => state.role === 'CUSTOMER');

/** Selector lấy vai trò hiện tại */
export const useCurrentRole = (): UserRole | null =>
  useAuthStore((state) => state.role);
