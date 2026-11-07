import { Link } from 'react-router';

/**
 * Màn hình Đăng nhập Quản trị viên (AdminLoginPage).
 */
export function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4">
      <div className="w-full rounded-2xl border border-border bg-surface-card p-8 shadow-xs">
        <h1 className="text-center text-2xl font-bold text-ink">
          Đăng Nhập Quản Trị Viên
        </h1>
        <p className="mt-2 text-center text-sm text-ink-muted">
          Hệ thống Quản lý Tour Du lịch Quảng Trị
        </p>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-ink">
              Tên tài khoản
            </label>
            <input
              id="username"
              type="text"
              placeholder="admin@quangtri.vn"
              className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-hidden"
            />
          </div>

          <div>
            <label htmlFor="pass" className="block text-sm font-medium text-ink">
              Mật khẩu
            </label>
            <input
              id="pass"
              type="password"
              placeholder="••••••••"
              className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2.5 font-medium text-white hover:opacity-90 transition-all cursor-pointer"
          >
            Đăng Nhập
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-ink-muted hover:text-ink">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
