import type { ReactNode } from 'react';

export interface PageHeaderProps {
  /** Dòng nhỏ phía trên tiêu đề */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Nút / liên kết hành động bên phải */
  actions?: ReactNode;
  className?: string;
}

/**
 * Phần đầu trang dùng chung để mọi trang con có cùng phong cách tiêu đề.
 */
export function PageHeader({ eyebrow, title, description, actions, className = '' }: PageHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between animate-fade-up ${className}`}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            <span aria-hidden="true" className="h-px w-6 bg-primary" />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
