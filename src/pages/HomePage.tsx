import { useState, useEffect, useRef } from 'react';
import type { Tour, TourFilter as TourFilterType } from '@/features/tours/types';
import { getTours, ALL_LOCATIONS } from '@/features/tours/service';
import { TourHeroBanner } from '@/features/tours/components/TourHeroBanner';
import { TourFilter } from '@/features/tours/components/TourFilter';
import { TourListView } from '@/features/tours/components/TourListView';

const INITIAL_FILTER: TourFilterType = {
  searchQuery: '',
  maxPrice: 0,
  selectedLocation: 'Tất cả địa danh',
};

/**
 * Container component: Quản lý logic tìm kiếm, lọc dữ liệu và điều phối các View trang chủ.
 */
export function HomePage() {
  const [filter, setFilter] = useState<TourFilterType>(INITIAL_FILTER);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const tourListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getTours(filter)
      .then((data) => {
        if (isMounted) {
          setTours(data);
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
  }, [filter]);

  const handleResetFilter = () => {
    setFilter(INITIAL_FILTER);
  };

  const handleScrollToTours = () => {
    tourListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Banner giới thiệu */}
      <TourHeroBanner onExploreClick={handleScrollToTours} />

      {/* Bộ lọc tìm kiếm và thanh trượt giá */}
      <div ref={tourListRef} className="scroll-mt-20">
        <TourFilter
          filter={filter}
          locationOptions={ALL_LOCATIONS}
          onChange={setFilter}
          onReset={handleResetFilter}
        />
      </div>

      {/* Danh sách Tour hoặc thông báo rỗng */}
      <TourListView
        tours={tours}
        isLoading={isLoading}
        onResetFilter={handleResetFilter}
      />
    </div>
  );
}
