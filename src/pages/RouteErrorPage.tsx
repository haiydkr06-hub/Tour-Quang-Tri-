import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { buttonClasses } from '@/components/ui/Button';

/**
 * Trang báo lỗi thân thiện (thay cho màn hình lỗi mặc định bằng tiếng Anh của React Router).
 * Hay gặp nhất: trang được tải theo yêu cầu (lazy) bị lỗi mạng hoặc vừa có bản cập nhật mới.
 */
export function RouteErrorPage() {
  const error = useRouteError();
  const isChunkError = error instanceof Error && /dynamically imported module|Importing a module script failed/i.test(error.message);
  const status = isRouteErrorResponse(error) ? error.status : null;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center animate-fade-up">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warning/15 text-3xl" aria-hidden="true">
        ⚠️
      </span>
      <h1 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">
        {isChunkError ? 'Trang chưa tải được' : 'Đã có lỗi xảy ra'}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
        {isChunkError
          ? 'Có thể kết nối mạng bị gián đoạn hoặc website vừa được cập nhật. Vui lòng tải lại trang.'
          : `Rất tiếc, hệ thống gặp sự cố khi hiển thị trang này${status ? ` (mã lỗi ${status})` : ''}. Vui lòng thử lại.`}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => window.location.reload()} className={buttonClasses('primary', 'md')}>
          Tải lại trang
        </button>
        <Link to="/" className={buttonClasses('outline', 'md')}>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
