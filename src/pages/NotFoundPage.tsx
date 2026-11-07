import { Link } from 'react-router';

/**
 * Màn hình 404 - Không tìm thấy trang.
 */
export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl font-extrabold text-primary">404</span>
      <h1 className="mt-4 text-2xl font-bold text-ink">
        Không tìm thấy trang yêu cầu
      </h1>
      <p className="mt-2 text-ink-muted">
        Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được thay đổi trong hệ thống.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-primary px-6 py-2.5 font-medium text-white hover:opacity-90 transition-all"
      >
        Về Trang Chủ
      </Link>
    </div>
  );
}
