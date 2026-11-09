import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { Tour, TourFilter as TourFilterValue } from '@/features/tours/types';
import { ALL_LOCATIONS, getTours } from '@/features/tours/service';
import { EMPTY_TOUR_FILTER, filterFromParams, filterToParams } from '@/features/tours/filterParams';
import { TourFilter } from '@/features/tours/components/TourFilter';
import { TourListView } from '@/features/tours/components/TourListView';

/**
 * Container: Danh sách tour có bộ lọc (từ khóa, địa danh, thanh trượt giá).
 * Bộ lọc được lưu trên URL (?q=&loc=&max=) nên có thể chia sẻ link / bấm Back.
 * View (TourFilter, TourListView) chỉ nhận props — đúng mô hình Container/View.
 */
export function ToursPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = filterFromParams(searchParams);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { searchQuery, maxPrice, selectedLocation } = filter;

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getTours({ searchQuery, maxPrice, selectedLocation }).then((data) => {
      if (isMounted) {
        setTours(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [searchQuery, maxPrice, selectedLocation]);

  const updateFilter = (next: TourFilterValue) => {
    setSearchParams(filterToParams(next), { replace: true });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-ink sm:text-4xl">Danh Sách Tour Quảng Trị</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Khám phá trọn vẹn di tích lịch sử, biển đảo Cồn Cỏ và văn hóa bản địa.
          </p>
        </div>
        <Link
          to="/custom-tour"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          ✏️ Tự Thiết Kế Tour Riêng
        </Link>
      </div>

      <TourFilter
        filter={filter}
        locationOptions={ALL_LOCATIONS}
        onChange={updateFilter}
        onReset={() => updateFilter(EMPTY_TOUR_FILTER)}
      />

      <TourListView tours={tours} isLoading={isLoading} onResetFilter={() => updateFilter(EMPTY_TOUR_FILTER)} />
    </div>
  );
}
