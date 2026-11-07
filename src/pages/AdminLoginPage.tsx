import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/features/auth/store';
import type { UserRole } from '@/features/auth/types';

/**
 * Màn hình Đăng nhập Quản trị viên & Đối tác (AdminLoginPage).
 * Cho phép đăng nhập theo form hoặc chọn vai trò demo để kiểm thử điều hướng.
 */
export function AdminLoginPage() {
  const navigate = useNavigate();
  const { role, user, login, logout } = useAuthStore();
  const [email, setEmail] = useState('admin@quangtri.vn');
  const [password, setPassword] = useState('123456');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      login('admin');
      navigate('/admin');
    } else {
      login('partner');
      navigate('/partner');
    }
  };

  const handleSelectRole = (targetRole: UserRole, targetPath: string) => {
    login(targetRole);
    navigate(targetPath);
  };

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md items-center justify-center px-4 py-8">
      <div className="w-full rounded-2xl border border-border bg-surface-card p-8 shadow-xs">
        <h1 className="text-center text-2xl font-bold text-ink">
          Xác Thực & Phân Quyền
        </h1>
        <p className="mt-1 text-center text-sm text-ink-muted">
          Hệ thống Quản trị & Đối tác Tour Quảng Trị
        </p>

        {user ? (
          <div className="my-6 rounded-lg bg-surface p-4 border border-border text-center">
            <p className="text-sm text-ink">
              Đang đăng nhập với: <strong className="text-primary">{user.name}</strong>
            </p>
            <p className="text-xs text-ink-muted">Vai trò hiện tại: {role.toUpperCase()}</p>
            <button
              type="button"
              onClick={logout}
              className="mt-3 rounded-md border border-border bg-surface-card px-3 py-1.5 text-xs font-semibold text-danger hover:bg-surface-alt transition-colors cursor-pointer"
            >
              Đăng Xuất
            </button>
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="auth-email" className="block text-sm font-medium text-ink">
              Tài khoản Email
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label htmlFor="auth-pass" className="block text-sm font-medium text-ink">
              Mật khẩu
            </label>
            <input
              id="auth-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-hidden"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2.5 font-medium text-white hover:opacity-90 transition-all cursor-pointer"
          >
            Đăng Nhập
          </button>
        </form>

        <div className="mt-6 border-t border-border pt-4 text-center">
          <p className="text-xs text-ink-muted mb-3">Tùy chọn đăng nhập nhanh thử nghiệm:</p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleSelectRole('admin', '/admin')}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:border-primary transition-colors cursor-pointer"
            >
              🔑 Vào quyền Quản trị viên (Admin)
            </button>
            <button
              type="button"
              onClick={() => handleSelectRole('partner', '/partner')}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:border-primary transition-colors cursor-pointer"
            >
              🚗 Vào quyền Đối tác (HDV / Tài xế)
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-ink-muted hover:text-ink">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
