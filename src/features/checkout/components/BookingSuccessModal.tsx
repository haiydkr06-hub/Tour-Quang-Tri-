import { useNavigate } from 'react-router';
import type { BookingRecord } from '../types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export interface BookingSuccessModalProps {
  booking: BookingRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Hộp thoại thông báo Đặt Tour thành công và hướng dẫn khách hàng.
 */
export function BookingSuccessModal({
  booking,
  isOpen,
  onClose,
}: BookingSuccessModalProps) {
  const navigate = useNavigate();

  if (!booking) return null;

  const goTo = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => goTo('/my-bookings')}
      title="Đặt Tour Thành Công! 🎉"
      footer={
        <>
          <Button variant="ghost" onClick={() => goTo('/')}>
            Về Trang Chủ
          </Button>
          <Button variant="primary" onClick={() => goTo('/my-bookings')}>
            Xem Đơn Của Tôi
          </Button>
        </>
      }
    >
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-2xl text-success">
          ✓
        </div>

        <div>
          <p className="text-xs text-ink-muted">Mã đơn đặt tour của quý khách:</p>
          <span className="mt-1 inline-block rounded-md bg-surface-alt px-3 py-1 font-mono text-base font-extrabold text-primary">
            {booking.id}
          </span>
        </div>

        <p className="text-xs text-ink-muted leading-relaxed">
          Cảm ơn quý khách <strong className="text-ink">{booking.customer.fullName}</strong> đã
          tin tưởng lựa chọn hành trình về nguồn di tích lịch sử Quảng Trị. Chúng tôi đã gửi email
          xác nhận chi tiết tới <span className="text-primary">{booking.customer.email}</span>.
        </p>

        <div className="rounded-lg bg-surface p-3 text-left text-xs border border-border space-y-1">
          <div className="flex justify-between">
            <span className="text-ink-muted">Chuyến tour:</span>
            <span className="font-semibold text-ink">{booking.cartItem.tourTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Ngày khởi hành:</span>
            <span className="font-semibold text-ink">{booking.customer.startDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Tổng tiền:</span>
            <span className="font-bold text-primary">
              {booking.totalPrice.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
