/** Đường vẽ SVG (nét 24×24) cho các biểu tượng nhỏ trong thẻ và trang chi tiết tour */
export const TOUR_ICONS = {
  pin: 'M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  calendar: 'M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  users: 'M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.15a3.5 3.5 0 0 1 0 6.7',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  bus: 'M6 17h12M5 17V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11M5 11h14M8 20v-3M16 20v-3M8 14h.01M16 14h.01',
  ticket: 'M4 8a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4zM14 6v12',
  guide: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1',
  shield: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3zM9 12l2 2 4-4',
} as const;

export type TourIconName = keyof typeof TOUR_ICONS;

export interface TourIconProps {
  name: TourIconName;
  className?: string;
}

/** Biểu tượng nét mảnh, màu theo `currentColor` (mặc định màu chủ đạo). */
export function TourIcon({ name, className = 'h-4 w-4 text-primary' }: TourIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={TOUR_ICONS[name]} />
    </svg>
  );
}
