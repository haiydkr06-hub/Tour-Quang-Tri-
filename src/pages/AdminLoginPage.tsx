import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/features/auth/store';
import { loginApi, DEMO_ACCOUNTS } from '@/features/auth/service';
import type { UserRole } from '@/features/auth/types';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Card } from '@/components/ui/Card';

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
    <div className="mx-auto flex min-h-[75vh] max-w-lg items-center justify-center px-4 py-8">
      <Card className="w-full">
        <h1 className="text-center text-2xl font-bold text-ink">
          Xác Thực & Phân Quyền (5 Roles)
        </h1>
        <p className="mt-1 text-center text-xs text-ink-muted">
          Hệ thống Quản lý và Đặt Tour Du lịch Quảng Trị
        </p>

        {user ? (
          <div className="my-6 rounded-lg bg-surface p-4 border border-border text-center">
            <p className="text-sm text-ink">
              Đang đăng nhập: <strong className="text-primary">{user.name}</strong>
            </p>
            <p className="text-xs text-ink-muted">Vai trò: {role}</p>
            <Button variant="danger" size="sm" className="mt-3" onClick={logout}>
              Đăng Xuất
            </Button>
          </div>
        ) : null}

        {error ? (
          <div className="my-4 rounded-lg bg-danger/10 p-3 text-xs text-danger border border-danger/20">
            {error}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
      </Card>
    </div>
  );
}
