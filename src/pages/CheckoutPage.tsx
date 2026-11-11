import { useState } from 'react';
import { Navigate, Link } from 'react-router';
import { useCartStore } from '@/features/cart/store';
import { useAuthStore } from '@/features/auth/store';
import type { BookingCustomerInfo, BookingRecord } from '@/features/checkout/types';
import { createBooking } from '@/features/checkout/service';
import { OrderSummary } from '@/features/checkout/components/OrderSummary';
import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';
import { BookingSuccessModal } from '@/features/checkout/components/BookingSuccessModal';
import { PageHeader } from '@/components/PageHeader';
import { buttonClasses } from '@/components/ui/Button';

/**
 * Container component: Màn hình Thanh toán Đặt tour (CheckoutPage).
 * Kiểm tra giỏ hàng: nếu rỗng tự động đẩy về trang chủ bằng <Navigate replace />.
 */
export function CheckoutPage() {
  const { item, clearCart } = useCartStore();
  const userId = useAuthStore((s) => s.user?.id);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<BookingRecord | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  // Nếu giỏ hàng rỗng, điều hướng ngay về trang chủ lúc render theo chuẩn React Router 8
  if (!item && !createdBooking) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (customerData: BookingCustomerInfo) => {
    if (!item) return;
    setIsSubmitting(true);

    try {
      const booking = await createBooking(customerData, item, userId);
      setCreatedBooking(booking);
      clearCart();
      setIsSuccessModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Giỏ tour"
        title="Thanh Toán & Xác Nhận Đặt Tour"
        description="Vui lòng rà soát lại chi tiết lịch trình và điền thông tin để hoàn tất đơn đặt vé."
        className="mb-8"
        actions={
          <Link to="/" className={buttonClasses('ghost', 'sm')}>
            ← Tiếp tục xem tour khác
          </Link>
        }
      />

      {item ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
          {/* Cột 1: Tóm tắt đơn hàng */}
          <OrderSummary item={item} />

          {/* Cột 2: Controlled Form có kiểm chứng Zod */}
          <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      ) : null}

      {/* Modal thông báo thành công */}
      <BookingSuccessModal
        booking={createdBooking}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}
