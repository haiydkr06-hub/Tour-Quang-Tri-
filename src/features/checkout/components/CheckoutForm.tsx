import { useState, type FormEvent } from 'react';
import type { BookingCustomerInfo, PaymentMethod } from '../types';
import { validateCheckoutForm } from '../validation';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export interface CheckoutFormProps {
  onSubmit: (data: BookingCustomerInfo) => void;
  isSubmitting: boolean;
}

/**
 * Biểu mẫu có kiểm soát (Controlled Form) xác thực dữ liệu qua Zod schema.
 */
export function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const [formData, setFormData] = useState<BookingCustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    startDate: '',
    specialRequests: '',
    paymentMethod: 'banking',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateCheckoutForm(formData);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  const handleFieldChange = (field: keyof BookingCustomerInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <Card>
      <h2 className="text-lg font-bold text-ink">Thông tin khách hàng & Thanh toán</h2>
      <p className="mt-1 text-xs text-ink-muted">
        Vui lòng điền chính xác để chúng tôi gửi vé và bố trí Hướng dẫn viên chu đáo.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <TextField
          label="Họ và tên người đặt tour *"
          placeholder="Nguyễn Văn A"
          value={formData.fullName}
          onChange={(e) => handleFieldChange('fullName', e.target.value)}
          error={errors.fullName}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Số điện thoại liên hệ *"
            placeholder="0912345678"
            value={formData.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            error={errors.phone}
          />

          <TextField
            label="Địa chỉ Email nhận vé *"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            error={errors.email}
          />
        </div>

        <TextField
          label="Ngày khởi hành dự kiến *"
          type="date"
          value={formData.startDate}
          onChange={(e) => handleFieldChange('startDate', e.target.value)}
          error={errors.startDate}
        />

        <div>
          <label htmlFor="specialReq" className="mb-1.5 block text-sm font-medium text-ink">
            Yêu cầu đặc biệt (Ăn chay, đoàn có người già/trẻ em...)
          </label>
          <textarea
            id="specialReq"
            rows={2}
            value={formData.specialRequests}
            onChange={(e) => handleFieldChange('specialRequests', e.target.value)}
            placeholder="Ghi chú thêm nếu có..."
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-hidden"
          />
          {errors.specialRequests ? (
            <p className="mt-1 text-xs text-danger">{errors.specialRequests}</p>
          ) : null}
        </div>

        {/* Phương thức thanh toán */}
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Phương thức thanh toán *
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              { id: 'banking', label: 'Chuyển khoản (QR)' },
              { id: 'cash', label: 'Tiền mặt khi đi' },
              { id: 'card', label: 'Thẻ Quốc tế' },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 text-xs font-medium transition-colors ${
                  formData.paymentMethod === method.id
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-surface text-ink hover:border-border/80'
                }`}
              >
                <span>{method.label}</span>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={formData.paymentMethod === method.id}
                  onChange={() =>
                    handleFieldChange('paymentMethod', method.id as PaymentMethod)
                  }
                  className="accent-primary"
                />
              </label>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full mt-4"
        >
          Hoàn Tất & Đặt Tour Ngay
        </Button>
      </form>
    </Card>
  );
}
