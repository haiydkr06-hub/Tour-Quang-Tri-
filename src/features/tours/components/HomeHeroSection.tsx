import type { CarouselSlide, BookingWidgetData } from '../types';
import { HomeBannerCarousel } from './HomeBannerCarousel';
import { HomeBookingWidget } from './HomeBookingWidget';
import { HomeServiceStrip } from './HomeServiceStrip';

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
    <section className="relative isolate w-full" aria-label="Banner và tìm kiếm tour">
      {/* Mảng màu trang trí mờ phía sau — chỉ để tạo chiều sâu, không chứa nội dung */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-10 right-0 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
        {/* Bên trái: banner ảnh lớn */}
        <div className="min-w-0 animate-fade-up">
          <HomeBannerCarousel slides={slides} />
        </div>

        {/* Bên phải: khung tìm kiếm tour */}
        <div className="min-w-0 animate-fade-up [animation-delay:120ms]">
          <HomeBookingWidget
            destinationOptions={destinationOptions}
            onSearch={onSearch}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="mt-6 lg:mt-8">
        <HomeServiceStrip />
      </div>
    </section>
  );
}
