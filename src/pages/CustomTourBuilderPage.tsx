import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { HistoricalDestination, TourGuide, VehicleOption } from '@/features/custom-tour/types';
import { getHistoricalDestinations, getTourGuides, getVehicleOptions } from '@/features/custom-tour/service';
import { useCustomTourStore } from '@/features/custom-tour/store';
import { useCartStore } from '@/features/cart/store';
import { LocationSelector } from '@/features/custom-tour/components/LocationSelector';
import { GuideSelector } from '@/features/custom-tour/components/GuideSelector';
import { VehicleSelector } from '@/features/custom-tour/components/VehicleSelector';
import { TourSummaryBar } from '@/features/custom-tour/components/TourSummaryBar';

export function CustomTourBuilderPage() {
  const navigate = useNavigate();
  const setCartItem = useCartStore((s) => s.setCartItem);
  const {
    selectedDestinationIds, days, guests, selectedGuideId, selectedVehicleId,
    toggleDestination, setDays, setGuests, setSelectedGuide, setSelectedVehicle,
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

  const selectedDests = destinations.filter((d) => selectedDestinationIds.includes(d.id));
  const selectedGuide = guides.find((g) => g.id === selectedGuideId) ?? null;
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) ?? null;

  const handleProceedToCheckout = () => {
    const baseTicketPrice = selectedDests.reduce((sum, d) => sum + d.entryFee, 0) * guests;
    const guidePrice = selectedGuide ? selectedGuide.pricePerDay * days : 0;
    const vehiclePrice = selectedVehicle ? selectedVehicle.pricePerDay * days : 0;
    const totalPrice = baseTicketPrice + guidePrice + vehiclePrice;

    setCartItem({
      type: 'custom',
      tourTitle: `Tour Tuỳ Chỉnh (${selectedDests.length} địa danh di tích)`,
      destinations: selectedDests.map((d) => d.name),
      days,
      guests,
      basePrice: baseTicketPrice,
      guide: selectedGuide ? {
        id: selectedGuide.id, name: selectedGuide.name, pricePerDay: selectedGuide.pricePerDay, rating: selectedGuide.rating,
      } : null,
      vehicle: selectedVehicle ? {
        id: selectedVehicle.id, name: selectedVehicle.name, seats: selectedVehicle.seats, pricePerDay: selectedVehicle.pricePerDay,
      } : null,
      totalPrice,
    });
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-ink-muted">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4" />
        <p className="text-sm">Đang tải danh sách di tích và nhân sự hỗ trợ...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">Trình Tạo Tour Cá Nhân Hóa Quảng Trị</h1>
        <p className="mt-2 text-sm text-ink-muted sm:text-base">
          Tự do lựa chọn các di tích lịch sử muốn đến, thuê hướng dẫn viên bản địa và phương tiện riêng theo ý thích.
        </p>
      </div>

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
