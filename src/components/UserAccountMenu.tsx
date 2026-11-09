import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Badge } from './ui/Badge';

export interface UserAccountMenuProps {
  user: { name: string; email?: string };
  role: string;
  onLogout: () => void;
}

const roleBadgeMap: Record<string, { label: string; variant: 'primary' | 'success' | 'warning' | 'neutral' }> = {
  ADMIN: { label: 'Quản trị viên', variant: 'primary' },
  CUSTOMER: { label: 'Khách du lịch', variant: 'success' },
  PARTNER: { label: 'Đối tác lữ hành', variant: 'warning' },
  GUIDE: { label: 'HDV bản địa', variant: 'primary' },
  DRIVER: { label: 'Tài xế', variant: 'neutral' },
};

export function UserAccountMenu({ user, role, onLogout }: UserAccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const badgeInfo = roleBadgeMap[role] ?? { label: role, variant: 'neutral' };
  const initials = user.name ? user.name.slice(0, 2).toUpperCase() : 'KH';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 rounded-full p-1 hover:bg-surface-alt transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-xs shadow-sm">
          {initials}
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-xs font-semibold text-ink leading-tight">{user.name}</p>
          <Badge variant={badgeInfo.variant} className="text-[9px] px-1 py-0">
            {badgeInfo.label}
          </Badge>
        </div>
        <span className="text-xs text-ink-muted">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-surface-card p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="border-b border-border px-3 py-2 text-xs">
            <p className="font-bold text-ink">{user.name}</p>
            {user.email && <p className="text-ink-muted truncate">{user.email}</p>}
          </div>

          <div className="py-1 text-xs">
            <Link
              to="/my-bookings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-ink hover:bg-surface-alt transition-colors"
            >
              <span>🎒</span> Đơn đặt tour của tôi
            </Link>
            {role === 'ADMIN' && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-primary font-semibold hover:bg-surface-alt transition-colors"
              >
                <span>⚙️</span> Trang Quản trị
              </Link>
            )}
            {['PARTNER', 'GUIDE', 'DRIVER'].includes(role) && (
              <Link
                to="/partner"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-primary font-semibold hover:bg-surface-alt transition-colors"
              >
                <span>🤝</span> Kênh Đối tác
              </Link>
            )}
          </div>

          <div className="border-t border-border pt-1">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-danger hover:bg-danger/10 transition-colors cursor-pointer"
            >
              <span>🚪</span> Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
