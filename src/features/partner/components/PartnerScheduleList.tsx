import type { PartnerTrip, TripStatus } from '../types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface PartnerScheduleListProps {
  trips: PartnerTrip[];
  onViewDetail: (trip: PartnerTrip) => void;
  onUpdateStatus: (tripId: string, status: TripStatus) => void;
}

const statusBadgeConfig: Record<TripStatus, { variant: 'warning' | 'primary' | 'success' | 'danger'; text: string }> = {
  assigned: { variant: 'warning', text: 'Chờ nhận chuyến' },
  in_progress: { variant: 'primary', text: 'Đang phục vụ' },
  completed: { variant: 'success', text: 'Đã hoàn thành' },
  cancelled: { variant: 'danger', text: 'Đã hủy' },
};

/**
 * Presentational View: Danh sách lịch trình các chuyến đi được phân công cho Đối tác.
 */
export function PartnerScheduleList({
  trips,
  onViewDetail,
  onUpdateStatus,
}: PartnerScheduleListProps) {
  const formatVND = (v: number) => `${v.toLocaleString('vi-VN')} đ`;

  if (trips.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center text-ink-muted">
        Chưa có chuyến đi nào được phân công trong danh mục này.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => {
        const badge = statusBadgeConfig[trip.status];
        return (
          <Card key={trip.id} className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant={badge.variant}>{badge.text}</Badge>
                <span className="font-mono text-xs font-bold text-ink-muted">
                  {trip.id}
                </span>
                <span className="text-xs text-ink-muted">• Khởi hành: {trip.startDate}</span>
              </div>

              <h3 className="text-base font-bold text-ink">{trip.tourTitle}</h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
                <span>👤 Đại diện: <strong className="text-ink">{trip.customerName}</strong></span>
                <span>👥 {trip.guestCount} khách</span>
                <span>💰 Thù lao: <strong className="text-primary">{formatVND(trip.payout)}</strong></span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onViewDetail(trip)}>
                Chi Tiết
              </Button>

              {trip.status === 'assigned' ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onUpdateStatus(trip.id, 'in_progress')}
                >
                  Nhận Chuyến
                </Button>
              ) : null}

              {trip.status === 'in_progress' ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onUpdateStatus(trip.id, 'completed')}
                >
                  ✓ Báo Cáo Hoàn Thành
                </Button>
              ) : null}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
