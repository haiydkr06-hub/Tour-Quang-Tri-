import type { RouteObject } from 'react-router';
import { RootLayout } from './RootLayout';
import { HomePage } from '@/pages/HomePage';
import { TourDetailPage } from '@/pages/TourDetailPage';
import { CustomTourBuilderPage } from '@/pages/CustomTourBuilderPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { PartnerDashboard } from '@/pages/PartnerDashboard';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { LoginPage } from '@/pages/public/LoginPage';
import { RegisterPage } from '@/pages/public/RegisterPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RoleGuard } from '@/features/auth/components/RoleGuard';

/**
 * Danh sách định tuyến ứng dụng chuẩn React Router 8 (Data Mode).
 * Phân quyền truy cập theo 5 vai trò (ADMIN, CUSTOMER, PARTNER, GUIDE, DRIVER) bằng RoleGuard.
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
          <RoleGuard requiredRole={['PARTNER', 'GUIDE', 'DRIVER']} redirectTo="/login">
            <PartnerDashboard />
          </RoleGuard>
        ),
      },
      {
        path: 'admin',
        element: (
          <RoleGuard requiredRole="ADMIN" redirectTo="/login">
            <AdminDashboard />
          </RoleGuard>
        ),
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'admin/login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
