import type { ReactNode } from 'react';
import { useAuthStore } from '../store';
import type { UserRole } from '../types';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface RoleGuardProps {
  requiredRole: UserRole | UserRole[];
  redirectTo: string;
  children: ReactNode;
}

/**
 * Thành phần bảo vệ tuyến phân quyền theo 5 vai trò (ADMIN, CUSTOMER, PARTNER, GUIDE, DRIVER).
 * Tuân thủ quy tắc import một chiều: features -> components.
 */
export function RoleGuard({ requiredRole, redirectTo, children }: RoleGuardProps) {
  const currentRole = useAuthStore((state) => state.role);

  const isAllowed = Array.isArray(requiredRole)
    ? currentRole !== null && requiredRole.includes(currentRole)
    : currentRole === requiredRole;

  return (
    <ProtectedRoute isAllowed={isAllowed} redirectTo={redirectTo}>
      {children}
    </ProtectedRoute>
  );
}
