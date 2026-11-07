/**
 * Chân trang ứng dụng (Footer) - Presentational component dùng chung.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-card py-8 text-center text-sm text-ink-muted">
      <div className="mx-auto max-w-7xl px-4">
        <p className="font-medium text-ink">
          Hệ thống Quản lý và Đặt Tour Du lịch Quảng Trị — phu-xuan-react
        </p>
        <p className="mt-1 text-xs">
          Dự án môn Web FrontEnd Nâng cao (INT.7.18) | Đại học Phú Xuân
        </p>
        <div className="mt-4 flex justify-center gap-6 text-xs">
          <span>Di tích Thành Cổ Quảng Trị</span>
          <span>•</span>
          <span>Vĩ tuyến 17 & Cầu Hiền Lương</span>
          <span>•</span>
          <span>Địa đạo Vịnh Mốc</span>
          <span>•</span>
          <span>Nghĩa trang Liệt sĩ Trường Sơn</span>
        </div>
      </div>
    </footer>
  );
}
