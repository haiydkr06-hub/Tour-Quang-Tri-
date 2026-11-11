import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHoverable?: boolean;
}

/**
 * Thẻ bao bọc nội dung (Card) chuẩn Design Tokens: bo góc mềm, đổ bóng nhẹ.
 */
export function Card({
  children,
  isHoverable = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border/80 bg-surface-card p-6 shadow-card transition-all duration-300 ${
        isHoverable ? 'hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
