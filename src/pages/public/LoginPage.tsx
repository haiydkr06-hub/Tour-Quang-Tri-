import { useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams, Link, Navigate } from 'react-router';
import { useAuthStore } from '@/features/auth/store';
import { loginApi, DEMO_ACCOUNTS } from '@/features/auth/service';
import { validateLoginForm } from '@/features/auth/schemas';
import type { LoginCredentials, UserRole } from '@/features/auth/types';
import { ForgotPasswordModal } from '@/features/auth/components/ForgotPasswordModal';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const { login, isAuthenticated, role: currentRole } = useAuthStore();

  const [formData, setFormData] = useState<LoginCredentials>({ identifier: '', password: '', rememberMe: false });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  if (isAuthenticated && currentRole) {
    if (currentRole === 'ADMIN') return <Navigate to="/admin" replace />;
    if (['PARTNER', 'GUIDE', 'DRIVER'].includes(currentRole)) return <Navigate to="/partner" replace />;
    return <Navigate to="/" replace />;
  }

  const handleRedirect = (role: UserRole) => {
    if (redirectTo) {
      navigate(redirectTo);
      return;
    }
    if (role === 'ADMIN') navigate('/admin');
    else if (['PARTNER', 'GUIDE', 'DRIVER'].includes(role)) navigate('/partner');
    else navigate('/');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');
    const validation = validateLoginForm(formData);
    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);
    try {
      const res = await loginApi(formData);
      if (res.success && res.user && res.token) {
        login(res.user, res.token);
        handleRedirect(res.user.role);
      } else {
        setServerError(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemo = async (acc: typeof DEMO_ACCOUNTS[0]) => {
    setServerError('');
    setIsLoading(true);
    try {
      const res = await loginApi({ identifier: acc.email, password: acc.password });
      if (res.success && res.user && res.token) {
        login(res.user, res.token);
        handleRedirect(res.user.role);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center px-4 py-8">
      <Card className="w-full">
        <div className="text-center">
          <span className="text-3xl">🏛️</span>
          <h1 className="mt-2 text-2xl font-bold text-ink">Đăng Nhập Hệ Thống</h1>
          <p className="mt-1 text-xs text-ink-muted">Quản lý và Đặt Tour Du Lịch Quảng Trị</p>
        </div>

        {serverError ? (
          <div className="mt-4 rounded-lg bg-danger/10 p-3 text-xs text-danger border border-danger/20" role="alert">
            {serverError}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <TextField
            label="Email hoặc Số điện thoại *"
            value={formData.identifier}
            onChange={(e) => setFormData((p) => ({ ...p, identifier: e.target.value }))}
            error={fieldErrors.identifier}
            required
          />

          <TextField
            label="Mật khẩu *"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
            error={fieldErrors.password}
            required
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-ink">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData((p) => ({ ...p, rememberMe: e.target.checked }))}
                className="rounded accent-primary"
              />
              Ghi nhớ đăng nhập
            </label>
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-primary hover:underline cursor-pointer"
            >
              Quên mật khẩu?
            </button>
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
            Đăng Nhập
          </Button>
        </form>

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-xs text-ink-muted mb-2 font-medium text-center">Tài khoản Demo (5 Vai Trò):</p>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            {DEMO_ACCOUNTS.map((acc) => (
              <Button
                key={acc.role}
                variant="outline"
                size="sm"
                className="py-1 px-2 text-[11px] justify-start truncate"
                onClick={() => handleDemo(acc)}
              >
                {acc.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4 text-center text-xs text-ink-muted space-y-2">
          <p>
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Đăng ký ngay
            </Link>
          </p>
          <Link to="/" className="inline-block text-ink-muted hover:text-ink">
            ← Quay lại trang chủ
          </Link>
        </div>
      </Card>

      <ForgotPasswordModal isOpen={isForgotModalOpen} onClose={() => setIsForgotModalOpen(false)} />
    </div>
  );
}
