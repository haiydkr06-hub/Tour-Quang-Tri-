import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectTo: string;
  children: ReactNode;
}

/**
 * Component bảo vệ tuyến đường yêu cầu quyền truy cập (Admin hoặc Partner).
 * Sử dụng <Navigate replace /> khi render theo đúng chuẩn React Router 8.
 */
export function ProtectedRoute({ isAllowed, redirectTo, children }: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
