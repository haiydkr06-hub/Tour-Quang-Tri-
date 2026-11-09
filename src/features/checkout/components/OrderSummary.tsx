import type { CartItem } from '@/lib/booking/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface OrderSummaryProps {
  item: CartItem;
}

/**
 * Presentational View: Tóm tắt thông tin chi phí và các dịch vụ trong đơn đặt tour.
 */
export function OrderSummary({ item }: OrderSummaryProps) {
  const formatVND = (v: number) => `${v.toLocaleString('vi-VN')} đ`;

  return (
    <Card className="space-y-5">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <span className="text-xs text-ink-muted">Loại đơn đặt</span>
          <h2 className="text-lg font-bold text-ink">{item.tourTitle}</h2>
        </div>
        <Badge variant={item.type === 'custom' ? 'primary' : 'success'}>
          {item.type === 'custom' ? 'Tour Tự Thiết Kế' : 'Tour Trọn Gói'}
        </Badge>
      </div>

      {/* Thông tin chuyến đi */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-ink-muted">Thời lượng:</span>
          <p className="font-semibold text-ink">{item.days} Ngày</p>
        </div>
        <div>
          <span className="text-ink-muted">Số lượng khách:</span>
          <p className="font-semibold text-ink">{item.guests} Người</p>
        </div>
      </div>

      {/* Danh sách các địa danh */}
      <div>
        <span className="text-xs font-medium text-ink-muted">Địa danh tham quan:</span>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {item.destinations.map((dest) => (
            <Badge key={dest} variant="neutral" className="text-[11px]">
              📍 {dest}
            </Badge>
          ))}
        </div>
      </div>

      {/* Dịch vụ kèm theo */}
      <div className="space-y-2 text-xs border-t border-border pt-4">
        <span className="font-semibold text-ink">Dịch vụ đi kèm:</span>
        <div className="flex justify-between text-ink-muted">
          <span>Hướng dẫn viên:</span>
          <span className="font-medium text-ink">
            {item.guide ? `✔ ${item.guide.name}` : 'Không thuê HDV'}
          </span>
        </div>
        <div className="flex justify-between text-ink-muted">
          <span>Phương tiện di chuyển:</span>
          <span className="font-medium text-ink">
            {item.vehicle ? `✔ ${item.vehicle.name}` : 'Tự túc phương tiện'}
          </span>
        </div>
      </div>

      {/* Tổng thanh toán gộp */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-ink">Tổng tiền thanh toán:</span>
          <span className="text-2xl font-extrabold text-primary">
            {formatVND(item.totalPrice)}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-ink-muted text-right">
          (Đã bao gồm thuế & toàn bộ phí dịch vụ nêu trên)
        </p>
      </div>
    </Card>
  );
}
