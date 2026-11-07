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
