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
import {
  getCarouselSlides,
  getDestinationOptions,
  getDestinationHighlights,
  getThematicCollections,
  getMapPoints,
  getCustomerReviews,
  getTravelArticles,
} from '@/features/tours/service';
import { useCartStore } from '@/features/cart/store';
import { HomeHeroSection } from '@/features/tours/components/HomeHeroSection';
import { HomeDestinationsSection } from '@/features/tours/components/HomeDestinationsSection';
import { HomeTourTabsSection } from '@/features/tours/components/HomeTourTabsSection';
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
    ]).then(([sData, dData, hData, cData, mData, rData, aData]) => {
      if (isMounted) {
        setSlides(sData);
        setDestOptions(dData);
        setDestHighlights(hData);
        setCollections(cData);
        setMapPoints(mData);
        setReviews(rData);
        setArticles(aData);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookingSearch = (_data: BookingWidgetData) => {
    document.getElementById('tour-noi-bat')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (_cat: string) => {
    document.getElementById('tour-noi-bat')?.scrollIntoView({ behavior: 'smooth' });
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
      <HomeHeroSection
        slides={slides}
        destinationOptions={destOptions}
        onSearch={handleBookingSearch}
      />

      <HomeDestinationsSection
        destinations={destHighlights}
        onSelectCategory={handleSelectCategory}
      />

      <HomeTourTabsSection onBookTour={handleBookTour} />

      <HomeCollectionsSection collections={collections} />

      <HomeInteractiveMap points={mapPoints} />

      <HomeReviewsSection reviews={reviews} />

      <HomeTravelArticlesSection articles={articles} />
    </div>
  );
}
