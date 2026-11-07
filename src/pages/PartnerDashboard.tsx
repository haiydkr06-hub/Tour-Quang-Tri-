import { useState, useEffect } from 'react';
import type { PartnerTrip, TripStatus } from '@/features/partner/types';
import { getPartnerTrips, updatePartnerTripStatus } from '@/features/partner/service';
import { useAuthStore } from '@/features/auth/store';
import { PartnerScheduleList } from '@/features/partner/components/PartnerScheduleList';
import { TripDetailModal } from '@/features/partner/components/TripDetailModal';
import { SupportSection } from '@/features/partner/components/SupportSection';
import { Button } from '@/components/ui/Button';

type Tab = 'schedule' | 'support';

/**
 * Container component: Bảng điều khiển Đối tác (PartnerDashboard).
 * Chỉ người dùng có vai trò Partner mới truy cập được qua RoleGuard.
 */
export function PartnerDashboard() {
  const user = useAuthStore((s) => s.user);
  const [trips, setTrips] = useState<PartnerTrip[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | TripStatus>('all');
  const [activeTab, setActiveTab] = useState<Tab>('schedule');
  const [selectedTrip, setSelectedTrip] = useState<PartnerTrip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadTrips = () => {
    getPartnerTrips().then(setTrips);
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const handleUpdateStatus = async (tripId: string, nextStatus: TripStatus) => {
    await updatePartnerTripStatus(tripId, nextStatus);
    loadTrips();
  };

  const handleOpenDetail = (trip: PartnerTrip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const filteredTrips = trips.filter((t) =>
    statusFilter === 'all' ? true : t.status === statusFilter
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-6">
      {/* Header đối tác */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div>
          <span className="text-xs font-semibold text-primary">Khu Vực Dành Cho Đối Tác</span>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">
            Lịch Trình & Nhiệm Vụ: {user?.name ?? 'Đối Tác Bản Địa'}
          </h1>
          <p className="mt-1 text-xs text-ink-muted">
            Quản lý các chuyến dẫn đoàn và điều phối phương tiện tham quan di tích Quảng Trị.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'schedule' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('schedule')}
          >
            📋 Lịch Trình Chuyến ({trips.length})
          </Button>
          <Button
            variant={activeTab === 'support' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('support')}
          >
            ℹ️ Quy Định & Hỗ Trợ
          </Button>
        </div>
      </div>

      {activeTab === 'schedule' ? (
        <div className="space-y-4">
          {/* Lọc trạng thái chuyến */}
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: 'all', label: 'Tất cả chuyến' },
              { id: 'assigned', label: 'Chờ nhận' },
              { id: 'in_progress', label: 'Đang phục vụ' },
              { id: 'completed', label: 'Đã hoàn thành' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as 'all' | TripStatus)}
                className={`rounded-lg px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-surface border border-border text-ink-muted hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <PartnerScheduleList
            trips={filteredTrips}
            onViewDetail={handleOpenDetail}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      ) : (
        <SupportSection />
      )}

      {/* Modal chi tiết chuyến */}
      <TripDetailModal
        trip={selectedTrip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={(id) => handleUpdateStatus(id, 'in_progress')}
      />
    </div>
  );
}
