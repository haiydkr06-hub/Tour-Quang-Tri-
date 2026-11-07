import { Link, Outlet } from 'react-router';
import { useTheme } from '@/context/useTheme';
import { useAuthStore } from '@/features/auth/store';
import { useCartStore } from '@/features/cart/store';

/**
 * RootLayout định hình khung trang toàn hệ thống.
 * Tích hợp chuyển đổi Theme Sáng/Tối và hiển thị trạng thái Giỏ hàng & Đăng nhập.
 */
export function RootLayout() {
  const { theme, toggleTheme } = useTheme();
  const { role, user, logout } = useAuthStore();
  const cartItem = useCartStore((s) => s.item);

  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink transition-colors duration-200">
      <header className="sticky top-0 z-50 border-b border-border bg-surface-card/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">
              Tour Quảng Trị
            </span>
          </Link>

          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link to="/" className="text-ink hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <Link
              to="/custom-tour"
              className="text-ink hover:text-primary transition-colors"
            >
              Tự thiết kế Tour
            </Link>
            <Link
              to="/checkout"
              className="relative text-ink hover:text-primary transition-colors"
            >
              Giỏ tour
              {cartItem ? (
                <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-primary px-1.5 py-0.2 text-[10px] font-bold text-white">
                  1
                </span>
              ) : null}
            </Link>
            <Link
              to="/partner"
              className="text-ink hover:text-primary transition-colors"
            >
              Đối tác
            </Link>
            <Link
              to="/admin"
              className="text-ink hover:text-primary transition-colors"
            >
              Quản trị
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Nút chuyển giao diện Sáng / Tối */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Đổi chế độ giao diện"
              className="rounded-lg border border-border bg-surface p-2 text-ink hover:bg-surface-alt transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <span role="img" aria-label="Mặt trời">☀️</span>
              ) : (
                <span role="img" aria-label="Mặt trăng">🌙</span>
              )}
            </button>

            {/* Trạng thái xác thực */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary hidden sm:inline">
                  {role.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-danger hover:bg-surface-alt transition-colors cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-surface-card py-8 text-center text-sm text-ink-muted">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-medium text-ink">
            Hệ thống Quản lý và Đặt Tour Du lịch Quảng Trị — phu-xuan-react
          </p>
          <p className="mt-1 text-xs">
            Dự án môn Web FrontEnd Nâng cao (INT.7.18) | Đại học Phú Xuân
          </p>
        </div>
      </footer>
    </div>
  );
}
