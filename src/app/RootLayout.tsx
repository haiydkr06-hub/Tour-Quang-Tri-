import { Link, Outlet } from 'react-router';

/**
 * RootLayout định hình khung trang toàn hệ thống gồm:
 * Thanh điều hướng (Header), Vùng hiển thị tuyến (Outlet), và Chân trang (Footer).
 */
export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink transition-colors duration-200">
      <header className="sticky top-0 z-50 border-b border-border bg-surface-card/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">
              Tour Quảng Trị
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className="text-ink hover:text-primary transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              to="/custom-tour"
              className="text-ink hover:text-primary transition-colors"
            >
              Tự thiết kế Tour
            </Link>
            <Link
              to="/partner"
              className="text-ink hover:text-primary transition-colors"
            >
              Khu vực Đối tác
            </Link>
            <Link
              to="/admin"
              className="rounded-md bg-primary px-3 py-1.5 text-white transition-opacity hover:opacity-90"
            >
              Quản trị viên
            </Link>
          </nav>
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
