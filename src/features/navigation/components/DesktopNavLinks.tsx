import { useState } from 'react';
import { NavLink } from 'react-router';
import type { NavItem } from '../types';
import { MegaMenuDropdown } from './MegaMenuDropdown';
import { Badge } from '@/components/ui/Badge';

export interface DesktopNavLinksProps {
  navItems: NavItem[];
  cartCount: number;
}

export function DesktopNavLinks({ navItems, cartCount }: DesktopNavLinksProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  return (
    <nav aria-label="Điều hướng chính" className="hidden xl:flex items-center gap-3">
      {navItems.map((item) => {
        if (item.children) {
          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                type="button"
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
                onClick={() => setMegaMenuOpen((p) => !p)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink hover:text-primary transition-colors cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-ink-muted">▼</span>
              </button>
              <MegaMenuDropdown
                items={item.children}
                isOpen={megaMenuOpen}
                onClose={() => setMegaMenuOpen(false)}
              />
            </div>
          );
        }

        return (
          <NavLink
            key={item.id}
            to={item.to ?? '/'}
            end={item.end}
            className={({ isActive }) =>
              `px-3 py-2 text-sm transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-ink font-medium hover:text-primary'
              }`
            }
          >
            {item.label}
          </NavLink>
        );
      })}

      <NavLink
        to="/checkout"
        className={({ isActive }) =>
          `flex items-center gap-1.5 px-3 py-2 text-sm transition-colors ${
            isActive ? 'text-primary font-bold' : 'text-ink font-medium hover:text-primary'
          }`
        }
        title="Giỏ tour đang chọn"
      >
        <span aria-hidden="true">🧳</span>
        <span>Giỏ tour</span>
        {cartCount > 0 && <Badge variant="primary" className="px-1.5 py-0 text-[10px]">{cartCount}</Badge>}
      </NavLink>
    </nav>
  );
}
