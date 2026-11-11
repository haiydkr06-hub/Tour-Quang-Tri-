import { useEffect, type ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Hộp thoại nổi (Modal) hỗ trợ đóng bằng phím Escape và click backdrop.
 */
export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 animate-fade-in bg-scrim/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative max-h-[90vh] w-full max-w-lg animate-fade-up overflow-y-auto rounded-3xl border border-border bg-surface-card p-6 shadow-pop"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 id="modal-title" className="text-lg font-bold text-ink">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng hộp thoại"
            className="rounded-lg p-1.5 text-ink-muted hover:bg-surface-alt hover:text-ink cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="py-4 text-sm text-ink">{children}</div>

        {footer ? (
          <div className="flex justify-end gap-3 border-t border-border pt-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
