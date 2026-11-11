import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import type { Tour, TourFilter as TourFilterValue } from '@/features/tours/types';
import {
  ALL_LOCATIONS,
  TOUR_CATEGORY_OPTIONS,
  TOUR_DURATION_OPTIONS,
  TOUR_SORT_OPTIONS,
  getTours,
} from '@/features/tours/service';
import {
  EMPTY_TOUR_FILTER,
  countActiveFilters,
  filterFromParams,
  filterToParams,
} from '@/features/tours/filterParams';
import { TourFilter } from '@/features/tours/components/TourFilter';
import { TourListView } from '@/features/tours/components/TourListView';
import { useCartStore } from '@/features/cart/store';
import { PageHeader } from '@/components/PageHeader';
import { buttonClasses } from '@/components/ui/Button';

/**
 * Container: Danh sách tour có bộ lọc (từ khóa, địa danh, giá, loại hình, thời lượng) và sắp xếp.
 * Bộ lọc được lưu trên URL (?q=&loc=&max=&cat=&dur=&sort=) nên có thể chia sẻ link / bấm Back.
 * View (TourFilter, TourListView) chỉ nhận props — đúng mô hình Container/View.
 */
export function ToursPage() {
  const navigate = useNavigate();
  const setCartItem = useCartStore((s) => s.setCartItem);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = filterFromParams(searchParams);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { searchQuery, maxPrice, selectedLocation, category, duration, sortBy } = filter;

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getTours({ searchQuery, maxPrice, selectedLocation, category, duration, sortBy }).then((data) => {
      if (isMounted) {
        setTours(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [searchQuery, maxPrice, selectedLocation, category, duration, sortBy]);

  const updateFilter = (next: TourFilterValue) => {
    setSearchParams(filterToParams(next), { replace: true });
  };

  // Đặt tour trọn gói — cùng logic với nút "Đặt tour" ở trang chủ
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
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Tour du lịch"
        title="Danh Sách Tour Quảng Trị"
        description="Khám phá trọn vẹn di tích lịch sử, biển đảo Cồn Cỏ và văn hóa bản địa."
        actions={
          <Link to="/custom-tour" className={buttonClasses('primary', 'md')}>
            ✏️ Tự Thiết Kế Tour Riêng
          </Link>
        }
      />

      <TourFilter
        filter={filter}
        locationOptions={ALL_LOCATIONS}
        categoryOptions={TOUR_CATEGORY_OPTIONS}
        durationOptions={TOUR_DURATION_OPTIONS}
        sortOptions={TOUR_SORT_OPTIONS}
        activeCount={countActiveFilters(filter)}
        onChange={updateFilter}
        onReset={() => updateFilter(EMPTY_TOUR_FILTER)}
      />

      <TourListView
        tours={tours}
        isLoading={isLoading}
        onResetFilter={() => updateFilter(EMPTY_TOUR_FILTER)}
        onBookTour={handleBookTour}
      />
    </div>
  );
}
