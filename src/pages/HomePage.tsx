import { useState, useEffect, useRef } from 'react';
import type { Tour, TourFilter as TourFilterType, CarouselSlide, BookingWidgetData } from '@/features/tours/types';
import {
  getTours,
  getCarouselSlides,
  getDestinationOptions,
  filterToursByBooking,
  ALL_LOCATIONS,
} from '@/features/tours/service';
import { HomeHeroSection } from '@/features/tours/components/HomeHeroSection';
import { TourFilter } from '@/features/tours/components/TourFilter';
import { TourListView } from '@/features/tours/components/TourListView';

const INITIAL_FILTER: TourFilterType = {
  searchQuery: '',
  maxPrice: 0,
  selectedLocation: 'Tất cả địa danh',
};

export function HomePage() {
  const [filter, setFilter] = useState<TourFilterType>(INITIAL_FILTER);
  const [tours, setTours] = useState<Tour[]>([]);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [destOptions, setDestOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const tourListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getCarouselSlides(), getDestinationOptions()]).then(([sData, dData]) => {
      if (isMounted) {
        setSlides(sData);
        setDestOptions(dData);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

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
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [filter]);

  const handleBookingSearch = async (data: BookingWidgetData) => {
    setIsSearching(true);
    try {
      const results = await filterToursByBooking(data);
      setTours(results);
      tourListRef.current?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setIsSearching(false);
    }
  };

  const handleResetFilter = () => {
    setFilter(INITIAL_FILTER);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Section: Banner Carousel 65-70% & Booking Widget 30-35% */}
      <HomeHeroSection
        slides={slides}
        destinationOptions={destOptions}
        onSearch={handleBookingSearch}
        isLoading={isSearching}
      />

      {/* Tour List & Quick Filter Section */}
      <div id="tour-noi-bat" ref={tourListRef} className="scroll-mt-20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-4">
          <div>
            <h2 className="text-2xl font-black text-ink">Các Tour Du Lịch Quảng Trị Tiêu Biểu</h2>
            <p className="text-xs text-ink-muted">Khám phá vùng đất anh hùng với những hành trình trọn vẹn nhất</p>
          </div>
          <p className="text-xs font-semibold text-primary">Tìm thấy {tours.length} chương trình tour</p>
        </div>

        <TourFilter
          filter={filter}
          locationOptions={ALL_LOCATIONS}
          onChange={setFilter}
          onReset={handleResetFilter}
        />

        <TourListView
          tours={tours}
          isLoading={isLoading || isSearching}
          onResetFilter={handleResetFilter}
        />
      </div>
    </div>
  );
}
