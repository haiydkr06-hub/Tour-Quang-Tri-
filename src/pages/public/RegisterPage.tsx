import { useState, type FormEvent } from 'react';
import { useNavigate, Link, Navigate } from 'react-router';
import { useAuthStore } from '@/features/auth/store';
import { registerApi } from '@/features/auth/service';
import { validateRegisterForm } from '@/features/auth/schemas';
import type { RegisterData } from '@/features/auth/types';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { AuthLayout } from '@/components/AuthLayout';

export function RegisterPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, role } = useAuthStore();
  const [formData, setFormData] = useState<RegisterData>({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '', agreeTerms: false,
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
    if (!validation.success) { setFieldErrors(validation.errors); return; }
    setFieldErrors({});
    setIsLoading(true);
    try {
      const res = await registerApi(formData);
      if (res.success && res.user && res.token) {
        login(res.user, res.token);
        navigate('/');
      } else {
        setServerError(res.message || 'Đăng ký tài khoản thất bại.');
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Đăng ký thất bại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout size="lg" title="Đăng Ký Tài Khoản Du Khách" subtitle="Khám phá và đặt tour du lịch Quảng Trị cá nhân hóa">
        {serverError && <Alert variant="error" className="mb-5">{serverError}</Alert>}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <TextField
            id="fullName"
            label="Họ và tên"
            value={formData.fullName}
            onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
            error={fieldErrors.fullName}
            placeholder="vd: Nguyễn Văn An"
            required
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              id="email"
              label="Địa chỉ Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              error={fieldErrors.email}
              placeholder="customer@gmail.com"
              required
            />
            <TextField
              id="phone"
              label="Số điện thoại"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              error={fieldErrors.phone}
              placeholder="0912345678"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              id="password"
              label="Mật khẩu"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
              error={fieldErrors.password}
              required
            />
            <TextField
              id="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
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
              <span>Tôi đồng ý với <span className="text-primary font-medium hover:underline">Điều khoản sử dụng</span> & Quy định du lịch Quảng Trị.</span>
            </label>
            {fieldErrors.agreeTerms && <p className="mt-1 text-xs text-danger" role="alert">{fieldErrors.agreeTerms}</p>}
          </div>
          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full mt-2">
            Đăng Ký Tài Khoản
          </Button>
        </form>
        <div className="mt-6 border-t border-border pt-4 text-center text-xs text-ink-muted space-y-2">
          <p>Đã có tài khoản? <Link to="/login" className="font-semibold text-primary hover:underline">Đăng nhập tại đây</Link></p>
          <Link to="/" className="inline-block text-ink-muted hover:text-ink">← Quay lại trang chủ</Link>
        </div>
    </AuthLayout>
  );
}
