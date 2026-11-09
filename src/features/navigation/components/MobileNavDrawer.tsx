import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import type { NavItem } from '../types';
import { Badge } from '@/components/ui/Badge';

export interface MobileNavDrawerProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
}

export function MobileNavDrawer({
  navItems,
  isOpen,
  onClose,
  cartCount,
}: MobileNavDrawerProps) {
  const [exploreExpanded, setExploreExpanded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation-disclosure"
      role="region"
      aria-label="Menu điều hướng di động"
      className="xl:hidden border-b border-border bg-surface-card px-4 py-4 shadow-xl animate-in fade-in slide-in-from-top-2"
    >
      <div className="flex flex-col gap-1 text-sm font-medium">
        {navItems.map((item) => {
          if (item.children) {
            return (
              <div key={item.id} className="rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExploreExpanded((p) => !p)}
                  aria-expanded={exploreExpanded}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-ink hover:bg-surface-alt transition-colors cursor-pointer"
                >
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-xs text-ink-muted">{exploreExpanded ? '▲' : '▼'}</span>
                </button>
                {exploreExpanded && (
                  <div className="ml-3 my-1 pl-3 border-l-2 border-border space-y-1.5">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.id}
                        to={child.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                            isActive
                              ? 'text-primary font-bold bg-primary/10'
                              : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
                          }`
                        }
                      >
                        <img
                          src={child.image}
                          alt={child.label}
                          className="h-7 w-7 rounded-md object-cover"
                          loading="lazy"
                        />
                        <span className="truncate">{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.id}
              to={item.to ?? '/'}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2.5 transition-colors ${
                  isActive
                    ? 'text-primary font-bold bg-primary/10'
                    : 'text-ink hover:bg-surface-alt'
                }`
              }
            >
              {item.label}
            </NavLink>
          );
        })}

        <NavLink
          to="/checkout"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
              isActive
                ? 'text-primary font-bold bg-primary/10'
                : 'text-ink hover:bg-surface-alt'
            }`
          }
        >
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true">🧳</span>
            <span>Giỏ tour</span>
          </span>
          {cartCount > 0 && <Badge variant="primary">{cartCount}</Badge>}
        </NavLink>
      </div>
    </div>
  );
}
