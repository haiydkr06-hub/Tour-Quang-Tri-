import { create } from 'zustand';
import type { AuthState, UserRole, User } from './types';

const DEMO_USERS: Record<UserRole, User | null> = {
  admin: {
    id: 'u-admin',
    name: 'Quản trị viên Hệ thống',
    email: 'admin@quangtri.vn',
    role: 'admin',
  },
  partner: {
    id: 'u-partner',
    name: 'Nguyễn Văn Hùng (HDV Bản địa)',
    email: 'hdv.hung@quangtri.vn',
    role: 'partner',
  },
  guest: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: 'guest',
  login: (role: UserRole, customName?: string) => {
    const baseUser = DEMO_USERS[role];
    const user: User | null =
      baseUser && customName
        ? { ...baseUser, name: customName }
        : baseUser;

    set({ role, user });
  },
  logout: () => {
    set({ role: 'guest', user: null });
  },
}));

/** Selector kiểm tra quyền Quản trị viên */
export const useIsAdmin = (): boolean => useAuthStore((state) => state.role === 'admin');

/** Selector kiểm tra quyền Đối tác (HDV / Tài xế) */
export const useIsPartner = (): boolean => useAuthStore((state) => state.role === 'partner');
