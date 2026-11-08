import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { UserAccountMenu } from './UserAccountMenu';

export interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user: { name: string; email?: string } | null;
  role: string;
  cartCount: number;
  onLogout: () => void;
}

const NAV_LINKS = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Khám phá', to: '/#kham-pha' },
  { label: 'Tour', to: '/#tour-noi-bat' },
  { label: 'Lịch trình', to: '/custom-tour' },
  { label: 'Ưu đãi', to: '/#uu-dai' },
  { label: 'Giới thiệu', to: '/#gioi-thieu' },
  { label: 'Liên hệ', to: '/#lien-he' },
];

export function Navbar({
  theme,
  onToggleTheme,
  user,
  role,
  cartCount,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-card/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white text-lg font-black shadow-sm">
            QT
          </span>
          <div className="leading-tight">
            <span className="text-lg font-black tracking-tight text-primary">Tour Quảng Trị</span>
            <p className="text-[10px] font-medium text-ink-muted">Hào khí & Di sản</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-ink hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/checkout"
            className="flex items-center gap-1.5 text-ink hover:text-primary transition-colors"
            title="Tour yêu thích / Giỏ tour"
          >
            <span>❤️</span>
            <span>Yêu thích</span>
            {cartCount > 0 && (
              <Badge variant="primary" className="px-1.5 py-0 text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Đổi giao diện sáng/tối"
            className="rounded-lg border border-border bg-surface p-2 text-ink hover:bg-surface-alt transition-colors cursor-pointer text-sm"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user ? (
            <UserAccountMenu user={user} role={role} onLogout={onLogout} />
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register" className="hidden sm:inline-block">
                <Button variant="primary" size="sm">
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="xl:hidden rounded-lg border border-border p-2 text-ink hover:bg-surface-alt transition-colors cursor-pointer"
            aria-label="Mở menu điều hướng"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-surface-card px-4 py-3 xl:hidden shadow-lg animate-in fade-in">
          <div className="flex flex-col gap-2 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-ink hover:bg-surface-alt"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-ink hover:bg-surface-alt"
            >
              <span>❤️ Tour yêu thích / Giỏ</span>
              {cartCount > 0 && <Badge variant="primary">{cartCount}</Badge>}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
