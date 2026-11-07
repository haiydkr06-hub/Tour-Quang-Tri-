import type { RouteObject } from 'react-router';
import { RootLayout } from './RootLayout';
import { HomePage } from '@/pages/HomePage';
import { TourDetailPage } from '@/pages/TourDetailPage';
import { CustomTourBuilderPage } from '@/pages/CustomTourBuilderPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { PartnerDashboard } from '@/pages/PartnerDashboard';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RoleGuard } from '@/features/auth/components/RoleGuard';

/**
 * Danh sách định tuyến ứng dụng chuẩn React Router 8 (Data Mode).
 * Phân quyền truy cập các tuyến quản trị và đối tác bằng RoleGuard.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'tours/:id',
        element: <TourDetailPage />,
      },
      {
        path: 'custom-tour',
        element: <CustomTourBuilderPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'partner',
        element: (
          <RoleGuard requiredRole="partner" redirectTo="/admin/login">
            <PartnerDashboard />
          </RoleGuard>
        ),
      },
      {
        path: 'admin',
        element: (
          <RoleGuard requiredRole="admin" redirectTo="/admin/login">
            <AdminDashboard />
          </RoleGuard>
        ),
      },
      {
        path: 'admin/login',
        element: <AdminLoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
