import { NavLink } from 'react-router';
import type { MegaMenuChild } from '../types';

export interface MegaMenuDropdownProps {
  items: MegaMenuChild[];
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenuDropdown({ items, isOpen, onClose }: MegaMenuDropdownProps) {
  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Danh sách điểm đến khám phá Quảng Trị"
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] rounded-3xl border border-border bg-surface-card p-5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2"
    >
      <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Điểm Đến Nổi Bật Quảng Trị
        </span>
        <span className="text-[11px] text-ink-muted">Khám phá danh thắng & di tích lịch sử</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((child) => (
          <NavLink
            key={child.id}
            to={child.to}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-2xl p-2.5 transition-all ${
                isActive
                  ? 'bg-primary/10 border border-primary/30 text-primary'
                  : 'hover:bg-surface-alt border border-transparent text-ink'
              }`
            }
          >
            <img
              src={child.image}
              alt={child.label}
              className="h-14 w-14 rounded-xl object-cover shrink-0 border border-border group-hover:scale-105 transition-transform"
              loading="lazy"
              decoding="async"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold leading-snug group-hover:text-primary transition-colors">
                {child.label}
              </p>
              <p className="text-[11px] text-ink-muted line-clamp-2 leading-tight mt-0.5">
                {child.description}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
