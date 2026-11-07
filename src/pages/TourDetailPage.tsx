import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import type { Tour } from '@/features/tours/types';
import { getTourById } from '@/features/tours/service';
import { useCartStore } from '@/features/cart/store';
import { TourDetailView } from '@/features/tours/components/TourDetailView';
import { Button } from '@/components/ui/Button';

/**
 * Container component: Màn hình Chi tiết Tour.
 * Ép kiểu useParams().id sang số trước khi tra cứu service; xử lý trạng thái 404 và đặt tour vào cartStore.
 */
export function TourDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const setCartItem = useCartStore((s) => s.setCartItem);

  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const tourId = Number(id);

  useEffect(() => {
    if (!id || Number.isNaN(tourId) || tourId <= 0) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    getTourById(tourId)
      .then((data) => {
        if (isMounted) {
          setTour(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, tourId]);

  const handleBookNow = (selectedTour: Tour) => {
    setCartItem({
      type: 'package',
      tourId: selectedTour.id,
      tourTitle: selectedTour.name,
      destinations: selectedTour.locations,
      days: 1,
      guests: 1,
      basePrice: selectedTour.price,
      totalPrice: selectedTour.price,
    });
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-ink-muted">Đang tải thông tin tour...</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <span className="text-5xl">🏛️</span>
        <h2 className="mt-4 text-2xl font-bold text-ink">Không tìm thấy tour</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Tour mang mã #{id} không tồn tại hoặc đã ngừng phục vụ.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button variant="primary">Về Trang Chủ</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <TourDetailView
      tour={tour}
      onBookNow={handleBookNow}
      onBack={() => navigate('/')}
    />
  );
}
