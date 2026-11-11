import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover hover:shadow-md hover:shadow-primary/30 hover:-translate-y-px',
  secondary: 'bg-surface-alt text-ink hover:bg-border',
  outline: 'border border-border bg-surface-card text-ink hover:border-primary hover:text-primary',
  danger: 'bg-danger text-danger-foreground hover:opacity-90',
  ghost: 'bg-transparent text-ink hover:bg-surface-alt',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-3.5 text-xs',
  md: 'h-11 gap-2 px-5 text-sm',
  lg: 'h-12 gap-2 px-7 text-base',
};

const baseClasses =
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:translate-y-0';

/**
 * Trả về chuỗi class của nút — dùng cho <Link> cần trông giống nút
 * mà không phải lồng <button> trong <a> (sai chuẩn HTML).
 */
export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className = ''): string {
  return `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
}

/**
 * Nút bấm chuẩn HTML ngữ nghĩa (<button>), sử dụng hệ thống Design Tokens.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses(variant, size, className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {children}
    </button>
  );
}
