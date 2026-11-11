import type { ReactNode } from 'react';

export interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Nội dung bên phải (bộ lọc, nút xem thêm...) */
  aside?: ReactNode;
  /** id cho tiêu đề để section dùng aria-labelledby */
  id?: string;
}

/**
 * Tiêu đề khu vực dùng chung cho các phần của trang chủ — cùng một nhịp chữ và khoảng cách.
 */
export function SectionHeading({ eyebrow, title, description, aside, id }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          <span aria-hidden="true" className="h-px w-6 bg-primary" />
          {eyebrow}
        </p>
        <h2 id={id} className="text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem] sm:leading-tight">
          {title}
        </h2>
        {description ? <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">{description}</p> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
