import { useParams, Link } from 'react-router';

/**
 * Màn hình Chi tiết Tour (TourDetailPage).
 * Tham số params.id là chuỗi được ép sang kiểu số trước khi sử dụng theo AGENTS.md.
 */
export function TourDetailPage() {
  const { id } = useParams<{ id: string }>();
  const tourId = Number(id);

  if (!id || Number.isNaN(tourId) || tourId <= 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-ink">Không tìm thấy thông tin tour</h2>
        <p className="mt-2 text-ink-muted">Mã tour không hợp lệ hoặc đã bị gỡ bỏ.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-2.5 font-medium text-white hover:opacity-90 transition-all"
        >
          Quay lại Trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-xl border border-border bg-surface-card p-6">
        <span className="inline-block rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          Mã Tour #{tourId}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-ink">
          Hành Trình Di Tích Lịch Sử Quảng Trị
        </h1>
        <p className="mt-3 text-ink-muted leading-relaxed">
          Chi tiết lịch trình tham quan các địa danh lịch sử hào hùng của mảnh đất lửa Quảng Trị.
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Link to="/" className="text-sm font-medium text-ink-muted hover:text-ink">
            ← Quay lại danh sách
          </Link>
          <Link
            to="/checkout"
            className="rounded-lg bg-primary px-6 py-2.5 font-medium text-white hover:opacity-90 transition-all"
          >
            Đặt Tour Ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
