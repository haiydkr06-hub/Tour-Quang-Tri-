import { useState } from 'react';
import { Navigate, Link } from 'react-router';
import { useCartStore } from '@/features/cart/store';
import type { BookingCustomerInfo, BookingRecord } from '@/features/checkout/types';
import { createBooking } from '@/features/checkout/service';
import { OrderSummary } from '@/features/checkout/components/OrderSummary';
import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';
import { BookingSuccessModal } from '@/features/checkout/components/BookingSuccessModal';

/**
 * Container component: Màn hình Thanh toán Đặt tour (CheckoutPage).
 * Kiểm tra giỏ hàng: nếu rỗng tự động đẩy về trang chủ bằng <Navigate replace />.
 */
export function CheckoutPage() {
  const { item, clearCart } = useCartStore();
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
      const booking = await createBooking(customerData, item);
      setCreatedBooking(booking);
      clearCart();
      setIsSuccessModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            Thanh Toán & Xác Nhận Đặt Tour
          </h1>
          <p className="mt-1 text-xs text-ink-muted sm:text-sm">
            Vui lòng rà soát lại chi tiết lịch trình và điền thông tin để hoàn tất đơn đặt vé.
          </p>
        </div>

        <Link
          to="/"
          className="text-xs font-medium text-ink-muted hover:text-ink transition-colors"
        >
          ← Tiếp tục xem tour khác
        </Link>
      </div>

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
