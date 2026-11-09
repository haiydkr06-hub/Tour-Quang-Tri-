import type { AdminTourItem, AdminStats } from './types';
import { changeBookingStatus, listBookings } from '@/lib/booking/repository';
import type { BookingRecord, BookingStatus } from '@/lib/booking/types';
import { buildMonthlyStats } from './stats';

let ADMIN_TOURS: AdminTourItem[] = [
  {
    id: 1,
    name: 'Ký ức 81 Ngày Đêm — Thành Cổ Quảng Trị',
    price: 650000,
    duration: '1 Ngày',
    locationsCount: 3,
    isActive: true,
  },
  {
    id: 2,
    name: 'Hành Trình Giới Tuyến Quân Sự — Vĩ Tuyến 17',
    price: 850000,
    duration: '1 Ngày',
    locationsCount: 3,
    isActive: true,
  },
  {
    id: 3,
    name: 'Huyền Thoại Lòng Đất — Địa Đạo Vịnh Mốc',
    price: 900000,
    duration: '1 Ngày',
    locationsCount: 3,
    isActive: true,
  },
  {
    id: 4,
    name: 'Về Nguồn Tri Ân — Nghĩa Trang Trường Sơn & Đường 9',
    price: 750000,
    duration: '1 Ngày',
    locationsCount: 2,
    isActive: true,
  },
  {
    id: 5,
    name: 'Khúc Tráng Ca Đường 9 — Khe Sanh & Làng Vây',
    price: 1100000,
    duration: '1 Ngày',
    locationsCount: 3,
    isActive: false,
  },
];

export async function getAdminTours(): Promise<AdminTourItem[]> {
  await new Promise((r) => setTimeout(r, 60));
  return [...ADMIN_TOURS];
}

export async function createAdminTour(
  data: Omit<AdminTourItem, 'id'>
): Promise<AdminTourItem> {
  await new Promise((r) => setTimeout(r, 80));
  const newTour: AdminTourItem = {
    ...data,
    id: Date.now(),
  };
  ADMIN_TOURS = [newTour, ...ADMIN_TOURS];
  return newTour;
}

export async function toggleAdminTourStatus(id: number): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 60));
  const tour = ADMIN_TOURS.find((t) => t.id === id);
  if (tour) {
    tour.isActive = !tour.isActive;
    return true;
  }
  return false;
}

export async function deleteAdminTour(id: number): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 60));
  ADMIN_TOURS = ADMIN_TOURS.filter((t) => t.id !== id);
  return true;
}

export async function getAdminStats(): Promise<AdminStats> {
  await new Promise((r) => setTimeout(r, 60));
  // Thống kê tính từ đơn thật (localStorage) gộp với số liệu lịch sử giả lập
  const monthlyStats = buildMonthlyStats(listBookings(), new Date());
  const current = monthlyStats[monthlyStats.length - 1];
  const previous = monthlyStats[monthlyStats.length - 2];
  return {
    totalRevenue: monthlyStats.reduce((sum, m) => sum + m.revenue, 0),
    totalBookings: monthlyStats.reduce((sum, m) => sum + m.count, 0),
    activeTours: ADMIN_TOURS.filter((t) => t.isActive).length,
    totalPartners: 14,
    revenueGrowthPercent:
      previous && previous.revenue > 0
        ? Math.round(((current.revenue - previous.revenue) / previous.revenue) * 100)
        : null,
    monthlyStats,
  };
}

export async function getAdminBookings(): Promise<BookingRecord[]> {
  await new Promise((r) => setTimeout(r, 60));
  return listBookings();
}

export async function setBookingStatus(
  id: string,
  status: BookingStatus
): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 60));
  return changeBookingStatus(id, status);
}
