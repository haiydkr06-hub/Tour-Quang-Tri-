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
import { ProtectedRoute } from '@/components/ProtectedRoute';

/**
 * Danh sách định tuyến ứng dụng chuẩn React Router 8 (Data Mode).
 * Định nghĩa mảng RouteObject[] theo đúng ROUTES.md.
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
          <ProtectedRoute isAllowed={true} redirectTo="/admin/login">
            <PartnerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute isAllowed={true} redirectTo="/admin/login">
            <AdminDashboard />
          </ProtectedRoute>
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
