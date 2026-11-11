import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { NAV_ITEMS } from '@/features/navigation/data';
import { DesktopNavLinks } from '@/features/navigation/components/DesktopNavLinks';
import { MobileNavDrawer } from '@/features/navigation/components/MobileNavDrawer';
import { UserAccountMenu } from './UserAccountMenu';
import { BrandLogo } from './BrandLogo';
import { buttonClasses } from './ui/Button';

export interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user: { name: string; email?: string } | null;
  role: string;
  cartCount: number;
  onLogout: () => void;
}

const iconButton =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-card text-ink transition-colors hover:border-primary/50 hover:text-primary cursor-pointer';

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
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-border bg-surface-card/90 shadow-card backdrop-blur-xl'
          : 'border-transparent bg-surface-card/70 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <BrandLogo />

        {/* Desktop Navigation */}
        <DesktopNavLinks navItems={NAV_ITEMS} cartCount={cartCount} />

        {/* Action Controls: Theme, User Auth, Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            className={iconButton}
          >
            {theme === 'dark' ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {user ? (
            <UserAccountMenu user={user} role={role} onLogout={onLogout} />
          ) : (
            <>
              <Link to="/login" className={buttonClasses('outline', 'sm', 'h-10')}>
                Đăng nhập
              </Link>
              <Link to="/register" className={buttonClasses('primary', 'sm', 'h-10 max-sm:hidden')}>
                Đăng ký
              </Link>
            </>
          )}

          {/* Mobile Disclosure Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-disclosure"
            aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            className={`${iconButton} xl:hidden`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {mobileMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
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
