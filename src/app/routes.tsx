import type { RouteObject } from 'react-router';
import { RootLayout } from './RootLayout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RouteErrorPage } from '@/pages/RouteErrorPage';
import { RoleGuard } from '@/features/auth/components/RoleGuard';

/**
 * Bảng tuyến của ứng dụng (React Router Data Mode).
 * Trang chủ và 404 tải ngay; các trang còn lại dùng `lazy` để tách gói JS
 * (code-splitting) — người dùng chỉ tải mã của trang họ mở.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        // Route không đường dẫn: lỗi của trang con hiển thị bên trong layout (vẫn có header/footer)
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: 'tours',
            lazy: () => import('@/pages/public/ToursPage').then((m) => ({ Component: m.ToursPage })),
          },
          {
            path: 'tours/:id',
            lazy: () => import('@/pages/TourDetailPage').then((m) => ({ Component: m.TourDetailPage })),
          },
          {
            path: 'about',
            lazy: () => import('@/pages/public/AboutPage').then((m) => ({ Component: m.AboutPage })),
          },
          {
            path: 'contact',
            lazy: () => import('@/pages/public/ContactPage').then((m) => ({ Component: m.ContactPage })),
          },
          {
            path: 'custom-tour',
            lazy: () =>
              import('@/pages/CustomTourBuilderPage').then((m) => ({ Component: m.CustomTourBuilderPage })),
          },
          {
            path: 'checkout',
            lazy: () => import('@/pages/CheckoutPage').then((m) => ({ Component: m.CheckoutPage })),
          },
          {
            path: 'my-bookings',
            lazy: () => import('@/pages/MyBookingsPage').then((m) => ({ Component: m.MyBookingsPage })),
          },
          {
            path: 'partner',
            lazy: () =>
              import('@/pages/PartnerDashboard').then(({ PartnerDashboard }) => ({
                element: (
                  <RoleGuard requiredRole={['PARTNER', 'GUIDE', 'DRIVER']} redirectTo="/login">
                    <PartnerDashboard />
                  </RoleGuard>
                ),
              })),
          },
          {
            path: 'admin',
            lazy: () =>
              import('@/pages/AdminDashboard').then(({ AdminDashboard }) => ({
                element: (
                  <RoleGuard requiredRole="ADMIN" redirectTo="/admin/login">
                    <AdminDashboard />
                  </RoleGuard>
                ),
              })),
          },
          {
            path: 'admin/login',
            lazy: () => import('@/pages/AdminLoginPage').then((m) => ({ Component: m.AdminLoginPage })),
          },
          {
            path: 'login',
            lazy: () => import('@/pages/public/LoginPage').then((m) => ({ Component: m.LoginPage })),
          },
          {
            path: 'register',
            lazy: () => import('@/pages/public/RegisterPage').then((m) => ({ Component: m.RegisterPage })),
          },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
];
