import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

/** Các trang đã có thanh hành động cố định ở cuối màn hình — ẩn nút để không che */
const HIDDEN_ON = ['/custom-tour'];

/**
 * Nút quay lại đầu trang: xuất hiện khi cuộn xuống quá 600px.
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Quay lại đầu trang"
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-pop transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover cursor-pointer ${
        isVisible ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
