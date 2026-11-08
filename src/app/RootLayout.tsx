import { Outlet } from 'react-router';
import { useTheme } from '@/context/useTheme';
import { useAuthStore } from '@/features/auth/store';
import { useCartStore } from '@/features/cart/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

/**
 * RootLayout định hình khung trang toàn hệ thống.
 * Điều phối dữ liệu từ context/store xuống Navbar và Footer.
 */
export function RootLayout() {
  const { theme, toggleTheme } = useTheme();
  const { role, user, logout } = useAuthStore();
  const cartItem = useCartStore((s) => s.item);

  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink transition-colors duration-200">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        user={user}
        role={role ?? ''}
        cartCount={cartItem ? 1 : 0}
        onLogout={logout}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
