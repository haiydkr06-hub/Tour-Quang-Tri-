import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHoverable?: boolean;
}

/**
 * Thẻ bao bọc nội dung (Card) chuẩn Design Tokens cho giao diện.
 */
export function Card({
  children,
  isHoverable = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface-card p-6 shadow-xs transition-all ${
        isHoverable
          ? 'hover:border-primary/50 hover:shadow-md'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
