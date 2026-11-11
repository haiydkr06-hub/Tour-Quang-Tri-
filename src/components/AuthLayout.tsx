import type { ReactNode } from 'react';
import { BrandLogo } from './BrandLogo';

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Độ rộng khung: form ngắn (đăng nhập) hoặc form dài (đăng ký) */
  size?: 'md' | 'lg';
}

/** Ba giá trị cốt lõi đã giới thiệu ở trang Giới thiệu — tái sử dụng, không thêm nội dung mới */
const VALUES = ['🏛️ Bảo Tồn Di Sản', '🎯 Tour Cá Nhân Hóa', '🤝 Kết Nối Đối Tác'];

/**
 * Khung chung cho các trang xác thực (đăng nhập, đăng ký, đăng nhập quản trị):
 * bảng thương hiệu nền xanh đậm bên trái (ẩn trên điện thoại) + form bên phải.
 */
export function AuthLayout({ title, subtitle, children, size = 'md' }: AuthLayoutProps) {
  return (
    <div className="mx-auto flex max-w-6xl items-center px-4 py-10 sm:px-6 lg:min-h-[calc(100vh-16rem)] lg:px-8">
      <div
        className={`mx-auto grid w-full overflow-hidden rounded-3xl border border-border/80 bg-surface-card shadow-pop animate-fade-up lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] ${
          size === 'lg' ? 'max-w-5xl' : 'max-w-4xl'
        }`}
      >
        <aside className="relative isolate hidden flex-col justify-between overflow-hidden bg-navy p-10 lg:flex">
          <div aria-hidden="true" className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-primary/35 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-24 -right-16 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <BrandLogo onDark />
          <div>
            <p className="text-3xl font-extrabold leading-tight text-on-media">
              Hào khí <span className="text-primary-light">&amp;</span> Di sản
            </p>
            <p className="mt-3 text-sm leading-relaxed text-on-media/70">Cổng thông tin &amp; dịch vụ du lịch tỉnh Quảng Trị</p>
            <ul className="mt-8 space-y-3">
              {VALUES.map((v) => (
                <li key={v} className="rounded-2xl border border-on-media/10 bg-on-media/5 px-4 py-3 text-sm font-semibold text-on-media/90 backdrop-blur-sm">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="p-6 sm:p-10">
          <div className="mb-7">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h1>
            {subtitle ? <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p> : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
