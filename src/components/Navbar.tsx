import { Link } from 'react-router';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user: { name: string } | null;
  role: string;
  cartCount: number;
  onLogout: () => void;
}

const roleBadgeMap: Record<string, { label: string; variant: 'primary' | 'success' | 'warning' | 'neutral' }> = {
  ADMIN: { label: 'Quản trị viên', variant: 'primary' },
  CUSTOMER: { label: 'Khách du lịch', variant: 'success' },
  PARTNER: { label: 'Đối tác lữ hành', variant: 'warning' },
  GUIDE: { label: 'HDV bản địa', variant: 'primary' },
  DRIVER: { label: 'Tài xế', variant: 'neutral' },
};

/**
 * Thanh điều hướng ứng dụng (Navbar) - Presentational component dùng chung.
 */
export function Navbar({
  theme,
  onToggleTheme,
  user,
  role,
  cartCount,
  onLogout,
}: NavbarProps) {
  const badgeInfo = roleBadgeMap[role] ?? { label: role, variant: 'neutral' };

  return (
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
          <Link to="/custom-tour" className="text-ink hover:text-primary transition-colors">
            Tự thiết kế Tour
          </Link>
          <Link to="/checkout" className="relative text-ink hover:text-primary transition-colors">
            Giỏ tour
            {cartCount > 0 ? (
              <Badge variant="primary" className="ml-1.5 px-1.5 py-0 text-[10px]">
                {cartCount}
              </Badge>
            ) : null}
          </Link>
          {['PARTNER', 'GUIDE', 'DRIVER'].includes(role) || !user ? (
            <Link to="/partner" className="text-ink hover:text-primary transition-colors">
              Đối tác
            </Link>
          ) : null}
          {role === 'ADMIN' || !user ? (
            <Link to="/admin" className="text-ink hover:text-primary transition-colors">
              Quản trị
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Đổi chế độ giao diện"
            className="rounded-lg border border-border bg-surface p-2 text-ink hover:bg-surface-alt transition-colors cursor-pointer"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="flex items-center gap-2.5">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-bold text-ink leading-none">{user.name}</p>
                <Badge variant={badgeInfo.variant} className="text-[10px] mt-0.5">
                  {badgeInfo.label}
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Đăng xuất
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register" className="hidden sm:inline-block">
                <Button variant="outline" size="sm">
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
