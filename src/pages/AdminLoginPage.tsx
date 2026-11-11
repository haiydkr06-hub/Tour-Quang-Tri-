import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/features/auth/store';
import { loginApi, DEMO_ACCOUNTS } from '@/features/auth/service';
import type { UserRole } from '@/features/auth/types';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Alert } from '@/components/ui/Alert';
import { AuthLayout } from '@/components/AuthLayout';

/**
 * Màn hình Đăng nhập Quản trị viên & Đối tác (AdminLoginPage).
 * Xác thực thông tin qua API Backend bảo mật bcrypt và hỗ trợ đăng nhập nhanh 5 quyền demo.
 */
export function AdminLoginPage() {
  const navigate = useNavigate();
  const { role, user, login, logout } = useAuthStore();
  const [identifier, setIdentifier] = useState('admin@quangtri.vn');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await loginApi({ identifier, password });
      if (res.success && res.user && res.token) {
        login(res.user, res.token);
        if (res.user.role === 'ADMIN') navigate('/admin');
        else if (['PARTNER', 'GUIDE', 'DRIVER'].includes(res.user.role)) navigate('/partner');
        else navigate('/');
      } else {
        setError(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDemo = async (demoEmail: string, demoPass: string, targetRole: UserRole) => {
    setError('');
    setIsLoading(true);
    try {
      const res = await loginApi({ identifier: demoEmail, password: demoPass });
      if (res.success && res.user && res.token) {
        login(res.user, res.token);
        if (targetRole === 'ADMIN') navigate('/admin');
        else if (['PARTNER', 'GUIDE', 'DRIVER'].includes(targetRole)) navigate('/partner');
        else navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Xác Thực & Phân Quyền (5 Roles)" subtitle="Hệ thống Quản lý và Đặt Tour Du lịch Quảng Trị">

        {user ? (
          <div className="mb-6 rounded-2xl border border-border bg-surface-alt p-4 text-center">
            <p className="text-sm text-ink">
              Đang đăng nhập: <strong className="text-primary">{user.name}</strong>
            </p>
            <p className="text-xs text-ink-muted">Vai trò: {role}</p>
            <Button variant="danger" size="sm" className="mt-3" onClick={logout}>
              Đăng Xuất
            </Button>
          </div>
        ) : null}

        {error ? <Alert variant="error" className="mb-5">{error}</Alert> : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            label="Email hoặc Tên đăng nhập"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <TextField
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
            Đăng Nhập
          </Button>
        </form>

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-xs text-ink-muted mb-2 font-medium">Đăng nhập nhanh 5 quyền demo:</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <Button
                key={acc.role}
                variant="outline"
                size="sm"
                className="text-[11px] justify-start py-1.5"
                onClick={() => handleSelectDemo(acc.email, acc.password, acc.role)}
              >
                {acc.role === 'ADMIN' ? '🔑 ' : acc.role === 'CUSTOMER' ? '👤 ' : acc.role === 'GUIDE' ? '🚩 ' : acc.role === 'DRIVER' ? '🚗 ' : '🤝 '}
                {acc.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-ink-muted hover:text-ink">
            ← Quay lại trang chủ
          </Link>
        </div>
    </AuthLayout>
  );
}
