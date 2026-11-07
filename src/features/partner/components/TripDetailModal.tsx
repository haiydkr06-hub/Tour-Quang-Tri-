import type { PartnerTrip } from '../types';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface TripDetailModalProps {
  trip: PartnerTrip | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept?: (tripId: string) => void;
}

/**
 * Modal hiển thị chi tiết thông tin đoàn khách và yêu cầu chuyến đi cho Đối tác.
 */
export function TripDetailModal({
  trip,
  isOpen,
  onClose,
  onAccept,
}: TripDetailModalProps) {
  if (!trip) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Chi Tiết Chuyến Đi — ${trip.id}`}
      footer={
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose}>
            Đóng
          </Button>
          {trip.status === 'assigned' && onAccept ? (
            <Button
              variant="primary"
              onClick={() => {
                onAccept(trip.id);
                onClose();
              }}
            >
              Nhận Chuyến Này
            </Button>
          ) : null}
        </div>
      }
    >
      <div className="space-y-4 text-xs">
        <div>
          <span className="text-ink-muted">Tên tour:</span>
          <h4 className="text-sm font-bold text-ink">{trip.tourTitle}</h4>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-lg bg-surface p-3 border border-border">
          <div>
            <span className="text-ink-muted">Khách đại diện:</span>
            <p className="font-semibold text-ink">{trip.customerName}</p>
          </div>
          <div>
            <span className="text-ink-muted">Số điện thoại:</span>
            <p className="font-semibold text-primary">{trip.customerPhone}</p>
          </div>
          <div>
            <span className="text-ink-muted">Ngày khởi hành:</span>
            <p className="font-semibold text-ink">{trip.startDate}</p>
          </div>
          <div>
            <span className="text-ink-muted">Quy mô đoàn:</span>
            <p className="font-semibold text-ink">{trip.guestCount} Người</p>
          </div>
        </div>

        <div>
          <span className="font-semibold text-ink">Điểm đến di tích:</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {trip.destinations.map((d) => (
              <Badge key={d} variant="neutral">
                📍 {d}
              </Badge>
            ))}
          </div>
        </div>

        {trip.specialNotes ? (
          <div className="rounded-lg bg-warning/5 p-3 border border-warning/20">
            <span className="font-bold text-warning">Lưu ý từ khách hàng:</span>
            <p className="mt-1 text-ink">{trip.specialNotes}</p>
          </div>
        ) : null}

        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="text-ink-muted">Mức thù lao chuyến:</span>
          <span className="text-base font-extrabold text-primary">
            {trip.payout.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>
    </Modal>
  );
}
