import { Link } from 'react-router';

/**
 * Màn hình Đặt tour & Thanh toán (CheckoutPage).
 */
export function CheckoutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-xl border border-border bg-surface-card p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          Thông Tin Đặt Tour & Thanh Toán
        </h1>
        <p className="mt-2 text-ink-muted">
          Vui lòng kiểm tra lại thông tin đơn đặt tour trước khi hoàn tất thanh toán.
        </p>

        <div className="my-6 rounded-lg bg-surface p-6 border border-border">
          <h2 className="font-semibold text-ink">Tóm tắt đơn hàng</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Tour di tích lịch sử Quảng Trị + Hướng dẫn viên + Phương tiện di chuyển.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Link to="/" className="text-sm font-medium text-ink-muted hover:text-ink">
            ← Hủy và về trang chủ
          </Link>
          <button
            type="button"
            className="rounded-lg bg-primary px-6 py-2.5 font-medium text-white hover:opacity-90 transition-all cursor-pointer"
          >
            Xác Nhận Đặt Tour
          </button>
        </div>
      </div>
    </div>
  );
}
