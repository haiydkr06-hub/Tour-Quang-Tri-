import { useState, useEffect } from 'react';
import type { AdminStats, AdminTourItem } from '@/features/admin/types';
import type { BookingRecord, BookingStatus } from '@/features/checkout/types';
import {
  getAdminStats,
  getAdminTours,
  getAdminBookings,
  createAdminTour,
  toggleAdminTourStatus,
  deleteAdminTour,
  setBookingStatus,
} from '@/features/admin/service';
import { AdminStatsOverview } from '@/features/admin/components/AdminStatsOverview';
import { AdminTourManager } from '@/features/admin/components/AdminTourManager';
import { AdminTourFormModal } from '@/features/admin/components/AdminTourFormModal';
import { AdminBookingManager } from '@/features/admin/components/AdminBookingManager';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/PageHeader';

type AdminTab = 'overview' | 'tours' | 'bookings';

/**
 * Container component: Bảng điều khiển Quản trị viên (AdminDashboard).
 * Được bảo vệ nghiêm ngặt qua RoleGuard chỉ cho phép tài khoản Admin truy cập.
 */
export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [tours, setTours] = useState<AdminTourItem[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [isAddTourModalOpen, setIsAddTourModalOpen] = useState(false);

  const reloadData = () => {
    getAdminStats().then(setStats);
    getAdminTours().then(setTours);
    getAdminBookings().then(setBookings);
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleAddTour = async (data: Omit<AdminTourItem, 'id'>) => {
    await createAdminTour(data);
    reloadData();
  };

  const handleToggleTourStatus = async (id: number) => {
    await toggleAdminTourStatus(id);
    reloadData();
  };

  const handleDeleteTour = async (id: number) => {
    await deleteAdminTour(id);
    reloadData();
  };

  const handleUpdateBookingStatus = async (id: string, status: BookingStatus) => {
    await setBookingStatus(id, status);
    reloadData();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      {/* Header Quản trị + tab chuyển đổi */}
      <PageHeader
        eyebrow="Khu Vực Quản Trị Hệ Thống"
        title="Bảng Điều Hành Tour Du Lịch Quảng Trị"
        description="Quản trị danh mục tour di tích, duyệt đơn đặt hàng và theo dõi chỉ số tăng trưởng."
        actions={
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === 'overview' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('overview')}
          >
            📊 Thống Kê Tổng Quan
          </Button>
          <Button
            variant={activeTab === 'tours' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('tours')}
          >
            🏛️ Quản Lý Tour ({tours.length})
          </Button>
          <Button
            variant={activeTab === 'bookings' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('bookings')}
          >
            📋 Duyệt Đơn Đặt ({bookings.length})
          </Button>
        </div>
        }
      />

      {/* Nội dung theo Tab */}
      {activeTab === 'overview' && stats ? (
        <AdminStatsOverview stats={stats} />
      ) : null}

      {activeTab === 'tours' ? (
        <AdminTourManager
          tours={tours}
          onAddNew={() => setIsAddTourModalOpen(true)}
          onToggleStatus={handleToggleTourStatus}
          onDelete={handleDeleteTour}
        />
      ) : null}

      {activeTab === 'bookings' ? (
        <AdminBookingManager
          bookings={bookings}
          onUpdateStatus={handleUpdateBookingStatus}
        />
      ) : null}

      {/* Modal Thêm Tour */}
      <AdminTourFormModal
        isOpen={isAddTourModalOpen}
        onClose={() => setIsAddTourModalOpen(false)}
        onSubmit={handleAddTour}
      />
    </div>
  );
}
