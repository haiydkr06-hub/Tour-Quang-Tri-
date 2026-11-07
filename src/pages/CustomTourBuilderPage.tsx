import { Link } from 'react-router';

/**
 * Màn hình Tự thiết kế tour cá nhân (CustomTourBuilderPage).
 */
export function CustomTourBuilderPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="rounded-xl border border-border bg-surface-card p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          Trình Tạo Tour Cá Nhân Hóa Quảng Trị
        </h1>
        <p className="mt-2 text-ink-muted">
          Tự do chọn các điểm đến di tích, thời gian khởi hành, loại xe và Hướng dẫn viên bản địa theo mong muốn.
        </p>

        <div className="my-8 rounded-lg border border-dashed border-border p-8 text-center bg-surface">
          <p className="text-ink-muted">
            Khu vực cấu hình tour: Thành Cổ, Vĩ tuyến 17, Địa đạo Vịnh Mốc, Đồi Chắt Bút...
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm font-medium text-ink-muted hover:text-ink">
            ← Quay lại
          </Link>
          <Link
            to="/checkout"
            className="rounded-lg bg-primary px-6 py-2.5 font-medium text-white hover:opacity-90 transition-all"
          >
            Tiếp tục Đặt vé
          </Link>
        </div>
      </div>
    </div>
  );
}
