import { useState, type FormEvent } from 'react';
import { useNavigate, Link, Navigate } from 'react-router';
import { useAuthStore } from '@/features/auth/store';
import { registerApi } from '@/features/auth/service';
import { validateRegisterForm } from '@/features/auth/schemas';
import type { RegisterData } from '@/features/auth/types';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function RegisterPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, role } = useAuthStore();

  const [formData, setFormData] = useState<RegisterData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated && role) {
    if (role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (['PARTNER', 'GUIDE', 'DRIVER'].includes(role)) return <Navigate to="/partner" replace />;
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');
    const validation = validateRegisterForm(formData);
    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    setIsLoading(true);
    try {
      const res = await registerApi(formData);
      if (res.success && res.user && res.token) {
        login(res.user, res.token);
        navigate('/');
      } else {
        setServerError(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[85vh] max-w-lg items-center justify-center px-4 py-8">
      <Card className="w-full">
        <div className="text-center">
          <span className="text-3xl">🕊️</span>
          <h1 className="mt-2 text-2xl font-bold text-ink">Đăng Ký Khách Du Lịch</h1>
          <p className="mt-1 text-xs text-ink-muted">Tạo tài khoản đặt tour di tích lịch sử Quảng Trị</p>
        </div>

        {serverError ? (
          <div className="mt-4 rounded-lg bg-danger/10 p-3 text-xs text-danger border border-danger/20" role="alert">
            {serverError}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
          <TextField
            label="Họ và tên của bạn *"
            placeholder="Hoàng Hải Yến"
            value={formData.fullName}
            onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
            error={fieldErrors.fullName}
            required
          />

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <TextField
              label="Địa chỉ Email *"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              error={fieldErrors.email}
              required
            />

            <TextField
              label="Số điện thoại *"
              placeholder="0912345678"
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              error={fieldErrors.phone}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <TextField
              label="Mật khẩu *"
              type="password"
              placeholder="Tối thiểu 6 ký tự (chữ + số)"
              value={formData.password}
              onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
              error={fieldErrors.password}
              required
            />

            <TextField
              label="Xác nhận mật khẩu *"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={(e) => setFormData((p) => ({ ...p, confirmPassword: e.target.value }))}
              error={fieldErrors.confirmPassword}
              required
            />
          </div>

          <div>
            <label className="flex items-start gap-2 cursor-pointer text-xs text-ink leading-relaxed">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData((p) => ({ ...p, agreeTerms: e.target.checked }))}
                className="mt-0.5 rounded accent-primary"
              />
              <span>
                Tôi đồng ý với{' '}
                <span className="text-primary font-medium hover:underline">Điều khoản sử dụng</span>{' '}
                & Quy định văn hóa viếng di tích Quảng Trị.
              </span>
            </label>
            {fieldErrors.agreeTerms ? (
              <p className="mt-1 text-xs text-danger" role="alert">{fieldErrors.agreeTerms}</p>
            ) : null}
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full mt-2">
            Đăng Ký Tài Khoản
          </Button>
        </form>

        <div className="mt-6 border-t border-border pt-4 text-center text-xs text-ink-muted space-y-2">
          <p>
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Đăng nhập tại đây
            </Link>
          </p>
          <Link to="/" className="inline-block text-ink-muted hover:text-ink">← Quay lại trang chủ</Link>
        </div>
      </Card>
    </div>
  );
}
