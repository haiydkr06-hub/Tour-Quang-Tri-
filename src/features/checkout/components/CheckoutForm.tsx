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

const PAYMENT_METHODS = [
  { id: 'banking', label: 'Chuyển khoản (QR)' },
  { id: 'vnpay', label: 'Cổng VNPAY' },
  { id: 'cash', label: 'Tiền mặt khi đi' },
  { id: 'card', label: 'Thẻ Quốc tế' },
] as const;

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
    <Card className="p-6">
      <h2 className="text-xl font-bold text-ink mb-1">Thông Tin Đặt Tour</h2>
      <p className="text-xs text-ink-muted mb-6">Vui lòng điền thông tin để hoàn tất xác nhận đặt tour</p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <TextField
          id="fullName"
          label="Họ và tên quý khách"
          value={formData.fullName}
          onChange={(e) => handleFieldChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="email"
            label="Địa chỉ Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            error={errors.email}
            required
          />
          <TextField
            id="phone"
            label="Số điện thoại"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            error={errors.phone}
            required
          />
        </div>
        <TextField
          id="startDate"
          label="Ngày dự kiến khởi hành"
          type="date"
          value={formData.startDate}
          onChange={(e) => handleFieldChange('startDate', e.target.value)}
          error={errors.startDate}
          required
        />
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-ink mb-1">
            Yêu cầu đặc biệt (tuỳ chọn)
          </label>
          <textarea
            id="specialRequests"
            rows={2}
            value={formData.specialRequests}
            onChange={(e) => handleFieldChange('specialRequests', e.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
            placeholder="Ghi chú về ăn uống, người cao tuổi, trẻ nhỏ..."
          />
        </div>
        <div className="space-y-2">
          <span className="block text-sm font-medium text-ink">Phương thức thanh toán</span>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.map((method) => (
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
                  onChange={() => handleFieldChange('paymentMethod', method.id as PaymentMethod)}
                  className="accent-primary"
                />
              </label>
            ))}
          </div>
        </div>
        <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full mt-4">
          Hoàn Tất & Đặt Tour Ngay
        </Button>
      </form>
    </Card>
  );
}
