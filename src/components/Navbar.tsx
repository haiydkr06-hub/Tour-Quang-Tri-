import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { NAV_ITEMS } from '@/features/navigation/data';
import { DesktopNavLinks } from '@/features/navigation/components/DesktopNavLinks';
import { MobileNavDrawer } from '@/features/navigation/components/MobileNavDrawer';
import { UserAccountMenu } from './UserAccountMenu';
import { Button } from './ui/Button';

export interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user: { name: string; email?: string } | null;
  role: string;
  cartCount: number;
  onLogout: () => void;
}

export function Navbar({
  theme,
  onToggleTheme,
  user,
  role,
  cartCount,
  onLogout,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-md border-b border-border text-ink'
          : 'bg-surface/80 backdrop-blur-sm border-b border-border/40 text-ink'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-black shadow-sm">
            QT
          </span>
          <div className="leading-tight">
            <span className="text-lg font-black tracking-tight text-primary">Tour Quảng Trị</span>
            <p className="text-[10px] font-medium text-ink-muted">Hào khí & Di sản</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <DesktopNavLinks navItems={NAV_ITEMS} cartCount={cartCount} />

        {/* Action Controls: Theme, User Auth, Mobile Toggle */}
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
              <Link to="/login"><Button variant="outline" size="sm">Đăng nhập</Button></Link>
              <Link to="/register" className="hidden sm:inline-block"><Button variant="primary" size="sm">Đăng ký</Button></Link>
            </div>
          )}

          {/* Mobile Disclosure Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-disclosure"
            aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            className="xl:hidden rounded-lg border border-border p-2 text-ink hover:bg-surface-alt transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Nav Disclosure Drawer */}
      <MobileNavDrawer
        navItems={NAV_ITEMS}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        cartCount={cartCount}
      />
    </header>
  );
}

export { Navbar as Header };
