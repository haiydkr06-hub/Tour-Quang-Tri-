import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/features/auth/store';
import type { UserRole } from '@/features/auth/types';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Card } from '@/components/ui/Card';

/**
 * Màn hình Đăng nhập Quản trị viên & Đối tác (AdminLoginPage).
 * Sử dụng bộ UI components dùng chung (TextField, Button, Card).
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
      <Card className="w-full">
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
            <Button
              variant="danger"
              size="sm"
              className="mt-3"
              onClick={logout}
            >
              Đăng Xuất
            </Button>
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <TextField
            label="Tài khoản Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" className="w-full">
            Đăng Nhập
          </Button>
        </form>

        <div className="mt-6 border-t border-border pt-4 text-center">
          <p className="text-xs text-ink-muted mb-3">Tùy chọn đăng nhập nhanh thử nghiệm:</p>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectRole('admin', '/admin')}
            >
              🔑 Vào quyền Quản trị viên (Admin)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectRole('partner', '/partner')}
            >
              🚗 Vào quyền Đối tác (HDV / Tài xế)
            </Button>
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
