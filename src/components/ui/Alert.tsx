import type { ReactNode } from 'react';

export type AlertVariant = 'success' | 'error' | 'info' | 'warning';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const styles: Record<AlertVariant, { box: string; icon: string; path: string }> = {
  success: {
    box: 'border-success/25 bg-success/10 text-success',
    icon: 'bg-success text-on-media',
    path: 'M5 12.5l4.5 4.5L19 7.5',
  },
  error: {
    box: 'border-danger/25 bg-danger/10 text-danger',
    icon: 'bg-danger text-danger-foreground',
    path: 'M12 7v6M12 16.5v.5',
  },
  warning: {
    box: 'border-warning/30 bg-warning/10 text-warning',
    icon: 'bg-warning text-on-media',
    path: 'M12 7v6M12 16.5v.5',
  },
  info: {
    box: 'border-primary/25 bg-primary/10 text-primary',
    icon: 'bg-primary text-primary-foreground',
    path: 'M12 11v6M12 7.5v.5',
  },
};

/**
 * Khung thông báo thống nhất (thành công / lỗi / cảnh báo / thông tin) cho toàn website.
 * Lỗi & cảnh báo dùng role="alert" để trình đọc màn hình đọc ngay.
 */
export function Alert({ variant = 'info', title, children, className = '' }: AlertProps) {
  const s = styles[variant];
  const isUrgent = variant === 'error' || variant === 'warning';

  return (
    <div
      role={isUrgent ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm animate-fade-up ${s.box} ${className}`}
    >
      <span aria-hidden="true" className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${s.icon}`}>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <path d={s.path} />
        </svg>
      </span>
      <div className="min-w-0 font-medium">
        {title ? <p className="font-bold">{title}</p> : null}
        <div className={title ? 'mt-0.5 opacity-90' : ''}>{children}</div>
      </div>
    </div>
  );
}
