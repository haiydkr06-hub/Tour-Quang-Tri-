import { Link } from 'react-router';

/**
 * Màn hình Trang chủ (HomePage) - Hiển thị danh sách tour và các tùy chọn tìm kiếm.
 */
export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-surface-card p-8 border border-border text-center shadow-xs">
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
          Khám Phá Di Tích Lịch Sử Quảng Trị
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-ink-muted">
          Đặt tour trọn gói hoặc tự thiết kế lịch trình cá nhân khám phá Thành Cổ,
          Vĩ tuyến 17, Cầu Hiền Lương, Địa đạo Vịnh Mốc và Nghĩa trang Trường Sơn.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/custom-tour"
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-xs hover:opacity-90 transition-all"
          >
            Tự thiết kế Tour
          </Link>
          <Link
            to="/tours/1"
            className="rounded-lg border border-border bg-surface px-6 py-3 font-semibold text-ink hover:border-primary transition-all"
          >
            Xem Tour Mẫu (Thành Cổ)
          </Link>
        </div>
      </div>
    </div>
  );
}
