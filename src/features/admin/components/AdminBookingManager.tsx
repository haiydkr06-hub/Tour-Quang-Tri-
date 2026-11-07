import type { BookingRecord, BookingStatus } from '@/features/checkout/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface AdminBookingManagerProps {
  bookings: BookingRecord[];
  onUpdateStatus: (id: string, status: BookingStatus) => void;
}

const statusBadgeConfig: Record<BookingStatus, { variant: 'warning' | 'primary' | 'success' | 'danger'; text: string }> = {
  pending: { variant: 'warning', text: 'Chờ duyệt' },
  confirmed: { variant: 'primary', text: 'Đã xác nhận' },
  completed: { variant: 'success', text: 'Đã hoàn thành' },
  cancelled: { variant: 'danger', text: 'Đã hủy' },
};

/**
 * Presentational View: Quản lý và phê duyệt các đơn đặt tour của khách hàng.
 */
export function AdminBookingManager({
  bookings,
  onUpdateStatus,
}: AdminBookingManagerProps) {
  const formatVND = (v: number) => `${v.toLocaleString('vi-VN')} đ`;

  return (
    <Card className="p-6 space-y-4">
      <div className="border-b border-border pb-4">
        <h3 className="text-base font-bold text-ink">Quản Lý Đơn Đặt Tour</h3>
        <p className="text-xs text-ink-muted">Danh sách toàn bộ các yêu cầu đặt tour từ du khách</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-ink-muted">
              <th className="pb-3 font-semibold">Mã Đơn</th>
              <th className="pb-3 font-semibold">Khách Hàng</th>
              <th className="pb-3 font-semibold">Tour Đặt</th>
              <th className="pb-3 font-semibold">Ngày Đi</th>
              <th className="pb-3 font-semibold">Tổng Tiền</th>
              <th className="pb-3 font-semibold">Trạng Thái</th>
              <th className="pb-3 text-right font-semibold">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {bookings.map((booking) => {
              const badge = statusBadgeConfig[booking.status];
              return (
                <tr key={booking.id} className="hover:bg-surface-alt/40 transition-colors">
                  <td className="py-3.5 font-mono font-bold text-primary">
                    {booking.id}
                  </td>
                  <td className="py-3.5">
                    <p className="font-bold text-ink">{booking.customer.fullName}</p>
                    <p className="text-[11px] text-ink-muted">{booking.customer.phone}</p>
                  </td>
                  <td className="py-3.5 text-ink font-medium max-w-xs pr-4">
                    {booking.cartItem.tourTitle}
                  </td>
                  <td className="py-3.5 text-ink-muted">
                    {booking.customer.startDate}
                  </td>
                  <td className="py-3.5 font-bold text-primary">
                    {formatVND(booking.totalPrice)}
                  </td>
                  <td className="py-3.5">
                    <Badge variant={badge.variant}>{badge.text}</Badge>
                  </td>
                  <td className="py-3.5 text-right space-x-2">
                    {booking.status === 'pending' ? (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          className="text-[11px] py-1 px-2"
                          onClick={() => onUpdateStatus(booking.id, 'confirmed')}
                        >
                          Duyệt
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[11px] py-1 px-2 text-danger hover:border-danger"
                          onClick={() => onUpdateStatus(booking.id, 'cancelled')}
                        >
                          Hủy
                        </Button>
                      </>
                    ) : (
                      <span className="text-[11px] text-ink-muted italic">Đã xử lý</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
