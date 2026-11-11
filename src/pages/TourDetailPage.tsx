import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import type { Tour } from '@/features/tours/types';
import { TOUR_CATEGORY_LABELS, getTourById } from '@/features/tours/service';
import { useCartStore } from '@/features/cart/store';
import { TourDetailView } from '@/features/tours/components/TourDetailView';
import { buttonClasses } from '@/components/ui/Button';

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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-busy="true" aria-label="Đang tải thông tin tour">
        <div className="mb-5 h-4 w-64 animate-pulse rounded-full bg-surface-alt" />
        <div className="h-[340px] animate-pulse rounded-3xl bg-surface-alt sm:h-[440px]" />
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[74px] animate-pulse rounded-2xl bg-surface-alt" />
          ))}
        </div>
        <span className="sr-only">Đang tải thông tin tour...</span>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <div className="rounded-3xl border border-dashed border-border bg-surface-card px-6 py-14 text-center animate-fade-up">
          <span aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
            🏛️
          </span>
          <h1 className="mt-5 text-2xl font-bold text-ink">Không tìm thấy tour</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Tour mang mã #{id} không tồn tại hoặc đã ngừng phục vụ.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/tours" className={buttonClasses('primary', 'md')}>
              Xem danh sách tour
            </Link>
            <Link to="/" className={buttonClasses('outline', 'md')}>
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TourDetailView
      tour={tour}
      categoryLabel={tour.category ? TOUR_CATEGORY_LABELS[tour.category] : undefined}
      onBookNow={handleBookNow}
    />
  );
}
