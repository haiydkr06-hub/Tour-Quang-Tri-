import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type {
  CarouselSlide,
  BookingWidgetData,
  DestinationHighlight,
  TourCollection,
  MapPoint,
  Tour,
} from '@/features/tours/types';
import {
  getCarouselSlides,
  getDestinationOptions,
  getDestinationHighlights,
  getThematicCollections,
  getMapPoints,
} from '@/features/tours/service';
import { useCartStore } from '@/features/cart/store';
import { HomeHeroSection } from '@/features/tours/components/HomeHeroSection';
import { HomeDestinationsSection } from '@/features/tours/components/HomeDestinationsSection';
import { HomeTourTabsSection } from '@/features/tours/components/HomeTourTabsSection';
import { HomeCollectionsSection } from '@/features/tours/components/HomeCollectionsSection';
import { HomeInteractiveMap } from '@/features/tours/components/HomeInteractiveMap';

export function HomePage() {
  const navigate = useNavigate();
  const setCartItem = useCartStore((s) => s.setCartItem);

  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [destOptions, setDestOptions] = useState<string[]>([]);
  const [destHighlights, setDestHighlights] = useState<DestinationHighlight[]>([]);
  const [collections, setCollections] = useState<TourCollection[]>([]);
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getCarouselSlides(),
      getDestinationOptions(),
      getDestinationHighlights(),
      getThematicCollections(),
      getMapPoints(),
    ]).then(([sData, dData, hData, cData, mData]) => {
      if (isMounted) {
        setSlides(sData);
        setDestOptions(dData);
        setDestHighlights(hData);
        setCollections(cData);
        setMapPoints(mData);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookingSearch = (_data: BookingWidgetData) => {
    const el = document.getElementById('tour-noi-bat');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (_cat: string) => {
    const el = document.getElementById('tour-noi-bat');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-16">
      {/* 1. Hero Section: Banner Carousel & Booking Widget */}
      <HomeHeroSection
        slides={slides}
        destinationOptions={destOptions}
        onSearch={handleBookingSearch}
      />

      {/* 2. Destination Highlights: 6 categories */}
      <HomeDestinationsSection
        destinations={destHighlights}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Tour Cards with Tabs (Nổi bật, Bán chạy, Giá tốt, Mới nhất) */}
      <HomeTourTabsSection onBookTour={handleBookTour} />

      {/* 4. Thematic Collections */}
      <HomeCollectionsSection collections={collections} />

      {/* 5. Interactive GPS Map of Quang Tri Landmarks */}
      <HomeInteractiveMap points={mapPoints} />
    </div>
  );
}
