import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuthStore } from '../store';
import type { UserRole } from '../types';

interface RoleGuardProps {
  requiredRole: UserRole | UserRole[];
  redirectTo?: string;
  children: ReactNode;
}

/**
 * Thành phần bảo vệ tuyến phân quyền theo 5 vai trò (ADMIN, CUSTOMER, PARTNER, GUIDE, DRIVER).
 * Tự động chuyển hướng về trang đăng nhập nếu chưa xác thực, hoặc về trang chủ nếu sai quyền.
 */
export function RoleGuard({
  requiredRole,
  redirectTo = '/login',
  children,
}: RoleGuardProps) {
  const { role, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    const targetUrl = `${redirectTo}?redirectTo=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={targetUrl} replace />;
  }

  const isAllowed = Array.isArray(requiredRole)
    ? role !== null && requiredRole.includes(role)
    : role === requiredRole;

  if (!isAllowed) {
    // Nếu đã đăng nhập nhưng không đủ quyền (ví dụ CUSTOMER vào /admin), điều hướng về trang chủ
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
