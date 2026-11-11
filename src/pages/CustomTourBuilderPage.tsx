import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { HistoricalDestination, TourGuide, VehicleOption } from '@/features/custom-tour/types';
import { getHistoricalDestinations, getTourGuides, getVehicleOptions } from '@/features/custom-tour/service';
import { useCustomTourStore } from '@/features/custom-tour/store';
import { calculateCustomTourPrice } from '@/features/custom-tour/pricing';
import { useCartStore } from '@/features/cart/store';
import { LocationSelector } from '@/features/custom-tour/components/LocationSelector';
import { ItineraryBuilder } from '@/features/custom-tour/components/ItineraryBuilder';
import { GuideSelector } from '@/features/custom-tour/components/GuideSelector';
import { VehicleSelector } from '@/features/custom-tour/components/VehicleSelector';
import { TourSummaryBar } from '@/features/custom-tour/components/TourSummaryBar';
import { PageHeader } from '@/components/PageHeader';

export function CustomTourBuilderPage() {
  const navigate = useNavigate();
  const setCartItem = useCartStore((s) => s.setCartItem);
  const {
    selectedDestinationIds, days, guests, selectedGuideId, selectedVehicleId,
    toggleDestination, addDestination, removeDestination, moveDestination,
    setDays, setGuests, setSelectedGuide, setSelectedVehicle,
  } = useCustomTourStore();

  const [destinations, setDestinations] = useState<HistoricalDestination[]>([]);
  const [guides, setGuides] = useState<TourGuide[]>([]);
  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getHistoricalDestinations(), getTourGuides(), getVehicleOptions()]).then(([dests, gds, vehs]) => {
      if (isMounted) {
        setDestinations(dests);
        setGuides(gds);
        setVehicles(vehs);
        setIsLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Giữ đúng thứ tự lịch trình người dùng đã sắp xếp
  const selectedDests = selectedDestinationIds
    .map((id) => destinations.find((d) => d.id === id))
    .filter((d): d is HistoricalDestination => d !== undefined);
  const selectedGuide = guides.find((g) => g.id === selectedGuideId) ?? null;
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) ?? null;

  const handleProceedToCheckout = () => {
    const price = calculateCustomTourPrice({
      destinations: selectedDests, guests, days, guide: selectedGuide, vehicle: selectedVehicle,
    });

    setCartItem({
      type: 'custom',
      tourTitle:
        selectedDests.length > 0
          ? `Tour Tuỳ Chỉnh (${selectedDests.length} địa danh di tích)`
          : selectedGuide && selectedVehicle
            ? `Thuê Hướng Dẫn Viên & Xe (${days} ngày)`
            : selectedGuide
              ? `Thuê Hướng Dẫn Viên: ${selectedGuide.name} (${days} ngày)`
              : `Thuê Xe Du Lịch: ${selectedVehicle?.name ?? ''} (${days} ngày)`,
      destinations: selectedDests.length > 0 ? selectedDests.map((d) => d.name) : ['Lịch trình tự do theo yêu cầu du khách'],
      days,
      guests,
      basePrice: price.tickets,
      guide: selectedGuide ? {
        id: selectedGuide.id, name: selectedGuide.name, pricePerDay: selectedGuide.pricePerDay, rating: selectedGuide.rating,
      } : null,
      vehicle: selectedVehicle ? {
        id: selectedVehicle.id, name: selectedVehicle.name, seats: selectedVehicle.seats, pricePerDay: selectedVehicle.pricePerDay,
      } : null,
      totalPrice: price.total,
    });
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8" aria-busy="true">
        <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-surface-alt" />
        <div className="h-36 animate-pulse rounded-3xl bg-surface-alt" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-3xl bg-surface-alt" />
          ))}
        </div>
        <p className="text-center text-sm text-ink-muted">Đang tải danh sách di tích và nhân sự hỗ trợ...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Tour cá nhân hóa"
        title="Trình Tạo Tour Cá Nhân Hóa Quảng Trị"
        description="Kéo thả các di tích lịch sử vào lịch trình, sắp xếp thứ tự tham quan, thuê hướng dẫn viên bản địa và phương tiện riêng."
      />

      <ItineraryBuilder
        stops={selectedDests}
        onAdd={addDestination}
        onMove={moveDestination}
        onRemove={removeDestination}
      />
      <LocationSelector destinations={destinations} selectedIds={selectedDestinationIds} onToggle={toggleDestination} />
      <GuideSelector guides={guides} selectedGuideId={selectedGuideId} onSelect={setSelectedGuide} />
      <VehicleSelector vehicles={vehicles} selectedVehicleId={selectedVehicleId} onSelect={setSelectedVehicle} />
      <TourSummaryBar
        selectedDestinations={selectedDests}
        selectedGuide={selectedGuide}
        selectedVehicle={selectedVehicle}
        days={days}
        guests={guests}
        onDaysChange={setDays}
        onGuestsChange={setGuests}
        onProceed={handleProceedToCheckout}
      />
    </div>
  );
}
