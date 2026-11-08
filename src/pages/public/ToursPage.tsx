import { useNavigate } from 'react-router';
import type { Tour } from '@/features/tours/types';
import { HomeTourTabsSection } from '@/features/tours/components/HomeTourTabsSection';
import { useCartStore } from '@/features/cart/store';
import { Button } from '@/components/ui/Button';

export function ToursPage() {
  const navigate = useNavigate();
  const setCartItem = useCartStore((s) => s.setCartItem);

  const handleBookTour = (tour: Tour) => {
    setCartItem({
      type: 'package',
      tourId: tour.id,
      tourTitle: tour.name,
      destinations: tour.locations,
      days: 1,
      guests: 2,
      basePrice: tour.price,
      totalPrice: tour.price,
    });
    navigate('/checkout');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-black text-ink sm:text-4xl">Danh Sách Tour Quảng Trị</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Khám phá trọn vẹn di tích lịch sử, biển đảo Cồn Cỏ và văn hóa bản địa.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => navigate('/custom-tour')}>
          ✏️ Tự Thiết Kế Tour Riêng
        </Button>
      </div>

      <HomeTourTabsSection onBookTour={handleBookTour} />
    </div>
  );
}
