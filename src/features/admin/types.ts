export interface MonthlyStat {
  month: string;
  count: number;
  revenue: number;
}

export interface AdminStats {
  totalRevenue: number;
  totalBookings: number;
  activeTours: number;
  totalPartners: number;
  /** % thay đổi doanh thu tháng này so với tháng trước; null nếu tháng trước bằng 0 */
  revenueGrowthPercent: number | null;
  monthlyStats: MonthlyStat[];
}

export interface AdminTourItem {
  id: number;
  name: string;
  price: number;
  duration: string;
  locationsCount: number;
  isActive: boolean;
}
