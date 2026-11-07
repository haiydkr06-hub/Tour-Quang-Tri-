import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  neutral: 'bg-surface-alt text-ink-muted border-border',
};

/**
 * Huy hiệu (Badge) hiển thị trạng thái hoặc nhãn theo màu sắc Design Tokens.
 */
export function Badge({
  variant = 'primary',
  children,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${badgeVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
