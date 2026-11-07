import { Link } from 'react-router';

/**
 * Màn hình Khu vực Đối tác (PartnerDashboard) - Dành cho Hướng dẫn viên và Tài xế.
 */
export function PartnerDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">
            Bảng Điều Khiển Đối Tác (HDV / Tài Xế)
          </h1>
          <p className="mt-1 text-ink-muted">
            Theo dõi danh sách các tour được phân công và xác nhận lịch trình phục vụ khách.
          </p>
        </div>
        <Link
          to="/"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-surface-alt transition-colors"
        >
          Trang chủ
        </Link>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface-card p-6">
        <h2 className="text-lg font-semibold text-ink">Lịch trình chuyến đi sắp tới</h2>
        <div className="mt-4 rounded-lg bg-surface p-6 text-center text-ink-muted border border-border">
          Chưa có lịch trình mới nào được phân công.
        </div>
      </div>
    </div>
  );
}
