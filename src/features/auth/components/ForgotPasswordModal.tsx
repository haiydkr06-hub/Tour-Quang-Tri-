import { useState, type FormEvent } from 'react';
import { forgotPasswordApi } from '../service';
import { validateForgotPasswordForm } from '../schemas';
import { Modal } from '@/components/ui/Modal';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';

export interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Hộp thoại yêu cầu khôi phục mật khẩu qua Email đã đăng ký.
 */
export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const validation = validateForgotPasswordForm({ email });
    if (!validation.success) {
      setError(validation.errors.email || 'Email không hợp lệ');
      return;
    }

    setIsLoading(true);
    try {
      const res = await forgotPasswordApi({ email });
      if (res.success) {
        setSuccessMsg(res.message);
      } else {
        setError(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setSuccessMsg('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Khôi Phục Mật Khẩu"
      footer={
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleClose}>
            Đóng
          </Button>
          {!successMsg ? (
            <Button
              variant="primary"
              size="sm"
              form="forgot-password-form"
              type="submit"
              isLoading={isLoading}
            >
              Gửi Mã Xác Nhận
            </Button>
          ) : null}
        </div>
      }
    >
      {successMsg ? (
        <div className="rounded-lg bg-success/10 p-4 text-xs text-success border border-success/20">
          <p className="font-semibold">{successMsg}</p>
          <p className="mt-1 text-ink-muted">
            Vui lòng kiểm tra hòm thư và làm theo hướng dẫn để đặt mật khẩu mới.
          </p>
        </div>
      ) : (
        <form id="forgot-password-form" onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-ink-muted leading-relaxed">
            Nhập địa chỉ email tài khoản của bạn để nhận mã OTP khôi phục mật khẩu.
          </p>

          <TextField
            label="Địa chỉ Email"
            type="email"
            placeholder="nhap.email@quangtri.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            required
          />
        </form>
      )}
    </Modal>
  );
}
