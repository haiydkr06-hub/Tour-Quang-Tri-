import type { CarouselSlide, BookingWidgetData } from '../types';
import { HomeBannerCarousel } from './HomeBannerCarousel';
import { HomeBookingWidget } from './HomeBookingWidget';

export interface HomeHeroSectionProps {
  slides: CarouselSlide[];
  destinationOptions: string[];
  onSearch: (data: BookingWidgetData) => void;
  isLoading?: boolean;
}

export function HomeHeroSection({
  slides,
  destinationOptions,
  onSearch,
  isLoading,
}: HomeHeroSectionProps) {
  return (
    <section className="relative w-full">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
        {/* Banner Carousel: 65% - 70% width on Desktop */}
        <div className="w-full flex-1 min-w-0">
          <HomeBannerCarousel slides={slides} />
        </div>

        {/* Booking Widget: 30% - 35% prominent right column on Desktop */}
        <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col justify-center">
          <HomeBookingWidget
            destinationOptions={destinationOptions}
            onSearch={onSearch}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
}
