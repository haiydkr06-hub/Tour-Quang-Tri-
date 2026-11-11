import { useState } from 'react';
import { NavLink } from 'react-router';
import type { NavItem } from '../types';
import { MegaMenuDropdown } from './MegaMenuDropdown';

export interface DesktopNavLinksProps {
  navItems: NavItem[];
  cartCount: number;
}

/** Kiểu chung cho một mục menu: viên thuốc nổi bật khi đang ở trang đó, nền nhạt khi di chuột */
const itemClass = (isActive: boolean) =>
  `relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
    isActive ? 'bg-primary/10 text-primary' : 'text-ink/80 hover:bg-surface-alt hover:text-ink'
  }`;

export function DesktopNavLinks({ navItems, cartCount }: DesktopNavLinksProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  return (
    <nav aria-label="Điều hướng chính" className="hidden xl:flex items-center gap-1">
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
                className={`${itemClass(megaMenuOpen)} cursor-pointer`}
              >
                <span>{item.label}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className={`h-4 w-4 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`}
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" />
                </svg>
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
            className={({ isActive }) => itemClass(isActive)}
          >
            {item.label}
          </NavLink>
        );
      })}

      <NavLink to="/checkout" className={({ isActive }) => itemClass(isActive)} title="Giỏ tour đang chọn">
        <span aria-hidden="true">🧳</span>
        <span>Giỏ tour</span>
        {cartCount > 0 ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
            {cartCount}
          </span>
        ) : null}
      </NavLink>
    </nav>
  );
}
