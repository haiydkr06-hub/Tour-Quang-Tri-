import type { AdminTourItem, AdminStats } from './types';
import { getBookings, updateBookingStatus } from '@/features/checkout/service';
import type { BookingRecord, BookingStatus } from '@/features/checkout/types';

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
  return {
    totalRevenue: 48500000,
    totalBookings: 38,
    activeTours: ADMIN_TOURS.filter((t) => t.isActive).length,
    totalPartners: 14,
    monthlyStats: [
      { month: 'T7', count: 18, revenue: 15400000 },
      { month: 'T8', count: 24, revenue: 21800000 },
      { month: 'T9', count: 20, revenue: 18200000 },
      { month: 'T10', count: 29, revenue: 26500000 },
      { month: 'T11', count: 38, revenue: 48500000 },
    ],
  };
}

export async function getAdminBookings(): Promise<BookingRecord[]> {
  return getBookings();
}

export async function setBookingStatus(
  id: string,
  status: BookingStatus
): Promise<boolean> {
  return updateBookingStatus(id, status);
}
