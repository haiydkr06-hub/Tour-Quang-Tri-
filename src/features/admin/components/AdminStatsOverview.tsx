import type { AdminStats } from '../types';
import { Card } from '@/components/ui/Card';

export interface AdminStatsOverviewProps {
  stats: AdminStats;
}

/**
 * Presentational View: Bảng điều khiển số liệu thống kê KPI và biểu đồ cột trực quan.
 */
export function AdminStatsOverview({ stats }: AdminStatsOverviewProps) {
  const formatVND = (v: number) => `${v.toLocaleString('vi-VN')} đ`;
  const maxMonthlyCount = Math.max(...stats.monthlyStats.map((s) => s.count), 1);

  return (
    <div className="space-y-6">
      {/* 4 Thẻ KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <span className="text-xs font-semibold text-ink-muted">Tổng Doanh Thu</span>
          <p className="mt-2 text-2xl font-extrabold text-primary">
            {formatVND(stats.totalRevenue)}
          </p>
          <span className="text-[11px] text-success">↑ +24% so với tháng trước</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-ink-muted">Lượt Đặt Tour</span>
          <p className="mt-2 text-2xl font-extrabold text-ink">
            {stats.totalBookings}
          </p>
          <span className="text-[11px] text-primary">Đơn đặt thành công</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-ink-muted">Tour Đang Khai Thác</span>
          <p className="mt-2 text-2xl font-extrabold text-ink">
            {stats.activeTours}
          </p>
          <span className="text-[11px] text-ink-muted">Tuyến di tích lịch sử</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-ink-muted">Mạng Lưới Đối Tác</span>
          <p className="mt-2 text-2xl font-extrabold text-ink">
            {stats.totalPartners}
          </p>
          <span className="text-[11px] text-ink-muted">HDV & Đội xe liên kết</span>
        </Card>
      </div>

      {/* Biểu đồ số lượng đơn đặt qua các tháng */}
      <Card className="p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-base font-bold text-ink">
              Biểu Đồ Lượng Đặt Tour Qua Các Tháng
            </h3>
            <p className="text-xs text-ink-muted">Số lượt đoàn du khách đến với Quảng Trị</p>
          </div>
          <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-primary border border-border">
            Năm 2026
          </span>
        </div>

        <div className="mt-6 flex h-48 items-end justify-between gap-2 sm:gap-6 pt-6">
          {stats.monthlyStats.map((item) => {
            const heightPercent = Math.round((item.count / maxMonthlyCount) * 100);
            return (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[11px] font-bold text-primary">
                  {item.count}
                </span>
                <div className="relative w-full max-w-[48px] rounded-t-md bg-surface-alt overflow-hidden flex items-end h-32">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-t-md bg-primary transition-all duration-500 hover:opacity-85"
                  />
                </div>
                <span className="text-xs font-medium text-ink-muted">
                  Tháng {item.month.replace('T', '')}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
