import { Link } from 'react-router';
import type { BookingRecord } from '../types';
import { BOOKING_STATUS_BADGE } from '@/lib/booking/status';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface MyBookingListProps {
  bookings: BookingRecord[];
  isLoading: boolean;
}

const formatVND = (v: number) => `${v.toLocaleString('vi-VN')} đ`;

/**
 * Presentational View: danh sách đơn đặt tour của khách, có trạng thái đang tải và rỗng.
 */
export function MyBookingList({ bookings, isLoading }: MyBookingListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4" aria-busy="true">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl border border-border bg-surface-alt" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="text-center">
        <p className="text-4xl" aria-hidden="true">🧳</p>
        <h2 className="mt-3 text-lg font-bold text-ink">Bạn chưa có đơn đặt tour nào</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Hãy chọn một tour trọn gói hoặc tự thiết kế hành trình riêng của bạn.
        </p>
        <div className="mt-5 flex justify-center gap-3 text-sm font-semibold">
          <Link to="/tours" className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90">
            Xem danh sách tour
          </Link>
          <Link to="/custom-tour" className="rounded-lg border border-border px-4 py-2 text-ink hover:border-primary hover:text-primary">
            Tự thiết kế tour
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((b) => {
        const badge = BOOKING_STATUS_BADGE[b.status];
        return (
          <li key={b.id}>
            <Card className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-sm font-bold text-primary">{b.id}</span>
                  <h2 className="text-base font-bold text-ink">{b.cartItem.tourTitle}</h2>
                </div>
                <Badge variant={badge.variant}>{badge.text}</Badge>
              </div>

              <ol className="flex flex-wrap gap-1.5 text-[11px]" aria-label="Lịch trình">
                {b.cartItem.destinations.map((d, i) => (
                  <li key={d}>
                    <Badge variant="neutral">{i + 1}. {d}</Badge>
                  </li>
                ))}
              </ol>

              <dl className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                <div>
                  <dt className="text-ink-muted">Ngày khởi hành</dt>
                  <dd className="font-semibold text-ink">{b.customer.startDate}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Số khách / ngày</dt>
                  <dd className="font-semibold text-ink">{b.cartItem.guests} khách · {b.cartItem.days} ngày</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Dịch vụ</dt>
                  <dd className="font-semibold text-ink">
                    {[b.cartItem.guide?.name, b.cartItem.vehicle?.name].filter(Boolean).join(' · ') || 'Không kèm'}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Tổng tiền</dt>
                  <dd className="font-bold text-primary">{formatVND(b.totalPrice)}</dd>
                </div>
              </dl>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
