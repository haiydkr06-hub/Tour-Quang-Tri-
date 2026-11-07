import { Link } from 'react-router';

/**
 * Màn hình Bảng điều khiển Quản trị viên (AdminDashboard).
 */
export function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">
            Bảng Quản Trị Hệ Thống Tour Quảng Trị
          </h1>
          <p className="mt-1 text-ink-muted">
            Tổng quan doanh số, quản lý danh sách tour, duyệt đơn và đối tác.
          </p>
        </div>
        <Link
          to="/"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-surface-alt transition-colors"
        >
          Về Trang Khách
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface-card p-6">
          <p className="text-sm font-medium text-ink-muted">Tổng số Tour</p>
          <p className="mt-2 text-3xl font-bold text-primary">12</p>
        </div>
        <div className="rounded-xl border border-border bg-surface-card p-6">
          <p className="text-sm font-medium text-ink-muted">Đơn Đặt Chờ Duyệt</p>
          <p className="mt-2 text-3xl font-bold text-ink">5</p>
        </div>
        <div className="rounded-xl border border-border bg-surface-card p-6">
          <p className="text-sm font-medium text-ink-muted">Đối tác (HDV / Tài xế)</p>
          <p className="mt-2 text-3xl font-bold text-ink">18</p>
        </div>
      </div>
    </div>
  );
}
