import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type {
  CarouselSlide,
  BookingWidgetData,
  DestinationHighlight,
  TourCollection,
  MapPoint,
  TourReview,
  TravelArticle,
  Tour,
} from '@/features/tours/types';
import type { TourGuide, VehicleOption } from '@/features/custom-tour/types';
import {
  getCarouselSlides,
  getDestinationOptions,
  getDestinationHighlights,
  getThematicCollections,
  getMapPoints,
  getCustomerReviews,
  getTravelArticles,
} from '@/features/tours/service';
import { getTourGuides, getVehicleOptions } from '@/features/custom-tour/service';
import { filterFromBookingWidget, filterToParams } from '@/features/tours/filterParams';
import { useCartStore } from '@/features/cart/store';
import { HomeHeroSection } from '@/features/tours/components/HomeHeroSection';
import { HomeDestinationsSection } from '@/features/tours/components/HomeDestinationsSection';
import { HomeTourTabsSection } from '@/features/tours/components/HomeTourTabsSection';
import { HomeHireSection } from '@/features/tours/components/HomeHireSection';
import { HomeCollectionsSection } from '@/features/tours/components/HomeCollectionsSection';
import { HomeInteractiveMap } from '@/features/tours/components/HomeInteractiveMap';
import { HomeReviewsSection } from '@/features/tours/components/HomeReviewsSection';
import { HomeTravelArticlesSection } from '@/features/tours/components/HomeTravelArticlesSection';

export function HomePage() {
  const navigate = useNavigate();
  const setCartItem = useCartStore((s) => s.setCartItem);

  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [destOptions, setDestOptions] = useState<string[]>([]);
  const [destHighlights, setDestHighlights] = useState<DestinationHighlight[]>([]);
  const [collections, setCollections] = useState<TourCollection[]>([]);
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [reviews, setReviews] = useState<TourReview[]>([]);
  const [articles, setArticles] = useState<TravelArticle[]>([]);
  const [guides, setGuides] = useState<TourGuide[]>([]);
  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getCarouselSlides(),
      getDestinationOptions(),
      getDestinationHighlights(),
      getThematicCollections(),
      getMapPoints(),
      getCustomerReviews(),
      getTravelArticles(),
      getTourGuides(),
      getVehicleOptions(),
    ]).then(([sData, dData, hData, cData, mData, rData, aData, gData, vData]) => {
      if (isMounted) {
        setSlides(sData);
        setDestOptions(dData);
        setDestHighlights(hData);
        setCollections(cData);
        setMapPoints(mData);
        setReviews(rData);
        setArticles(aData);
        setGuides(gData);
        setVehicles(vData);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookingSearch = (data: BookingWidgetData) => {
    const params = filterToParams(filterFromBookingWidget(data)).toString();
    navigate(params ? `/tours?${params}` : '/tours');
  };

  const handleSelectCategory = (cat: string) => {
    navigate(`/tours?cat=${cat}`);
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

  const handleHireGuide = (guide: TourGuide) => {
    setCartItem({
      type: 'custom',
      tourTitle: `Thuê Hướng Dẫn Viên Bản Địa: ${guide.name} (1 ngày)`,
      destinations: ['Lịch trình tự do theo yêu cầu của du khách'],
      days: 1,
      guests: 2,
      basePrice: 0,
      guide: { id: guide.id, name: guide.name, pricePerDay: guide.pricePerDay, rating: guide.rating },
      vehicle: null,
      totalPrice: guide.pricePerDay,
    });
    navigate('/checkout');
  };

  const handleHireVehicle = (vehicle: VehicleOption) => {
    setCartItem({
      type: 'custom',
      tourTitle: `Thuê Xe & Tài Xế: ${vehicle.name} (1 ngày)`,
      destinations: ['Lịch trình tự do theo yêu cầu của du khách'],
      days: 1,
      guests: 2,
      basePrice: 0,
      guide: null,
      vehicle: { id: vehicle.id, name: vehicle.name, seats: vehicle.seats, pricePerDay: vehicle.pricePerDay },
      totalPrice: vehicle.pricePerDay,
    });
    navigate('/checkout');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 pb-4 pt-6 sm:space-y-24 sm:px-6 lg:px-8">
      <HomeHeroSection slides={slides} destinationOptions={destOptions} onSearch={handleBookingSearch} />
      <HomeDestinationsSection destinations={destHighlights} onSelectCategory={handleSelectCategory} />
      <HomeTourTabsSection onBookTour={handleBookTour} />
      <HomeHireSection
        guides={guides}
        vehicles={vehicles}
        onHireGuide={handleHireGuide}
        onHireVehicle={handleHireVehicle}
      />
      <HomeCollectionsSection collections={collections} />
      <HomeInteractiveMap points={mapPoints} />
      <HomeReviewsSection reviews={reviews} />
      <HomeTravelArticlesSection articles={articles} />
    </div>
  );
}
