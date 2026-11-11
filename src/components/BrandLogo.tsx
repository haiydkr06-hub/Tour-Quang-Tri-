import { Link } from 'react-router';

export interface BrandLogoProps {
  /** Hiển thị trên nền tối (footer) */
  onDark?: boolean;
  /** Dòng phụ dưới tên thương hiệu */
  tagline?: string;
}

/**
 * Logo Tour Quảng Trị dùng chung cho Header và Footer.
 */
export function BrandLogo({ onDark = false, tagline = 'Hào khí & Di sản' }: BrandLogoProps) {
  return (
    <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Tour Quảng Trị — về trang chủ">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-sm font-black tracking-tight text-primary-foreground shadow-md shadow-primary/30 transition-transform duration-300 group-hover:-rotate-6">
        QT
      </span>
      <span className="leading-tight">
        <span className={`block text-[17px] font-extrabold tracking-tight ${onDark ? 'text-on-media' : 'text-ink'}`}>
          Tour <span className="text-primary">Quảng Trị</span>
        </span>
        <span className={`hidden text-[11px] font-medium sm:block ${onDark ? 'text-on-media/60' : 'text-ink-muted'}`}>
          {tagline}
        </span>
      </span>
    </Link>
  );
}
