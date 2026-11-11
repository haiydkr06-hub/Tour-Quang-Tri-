import { useState, useEffect } from 'react';
import type { Tour, TourTab } from '../types';
import { getToursByTab } from '../service';
import { TourCardItem } from './TourCardItem';
import { TourCardSkeleton } from './TourCardSkeleton';
import { Link } from 'react-router';
import { buttonClasses } from '@/components/ui/Button';

export interface HomeTourTabsSectionProps {
  onBookTour?: (tour: Tour) => void;
}

const TABS: { id: TourTab; label: string; icon: string }[] = [
  { id: 'featured', label: 'Tour Nổi Bật', icon: '🔥' },
  { id: 'best_seller', label: 'Bán Chạy Nhất', icon: '🏆' },
  { id: 'good_price', label: 'Giá Ưu Đãi', icon: '🏷️' },
  { id: 'latest', label: 'Mới Nhất', icon: '✨' },
];

export function HomeTourTabsSection({ onBookTour }: HomeTourTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<TourTab>('featured');
  const [sortByPrice, setSortByPrice] = useState<'none' | 'asc' | 'desc'>('none');
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getToursByTab(activeTab, sortByPrice)
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
  }, [activeTab, sortByPrice]);

  return (
    <section id="tour-noi-bat" className="reveal scroll-mt-24 space-y-6">
      {/* Header and Controls */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary before:h-px before:w-6 before:bg-primary before:content-['']">
            Hành Trình Được Yêu Thích
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem] sm:leading-tight">
            Các Chương Trình Tour Tuyển Chọn
          </h2>
        </div>

        {/* Sort by price dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="price-sort" className="text-xs font-semibold text-ink-muted">
            Sắp xếp giá:
          </label>
          <select
            id="price-sort"
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value as 'none' | 'asc' | 'desc')}
            className="h-10 cursor-pointer rounded-xl border border-border bg-surface-card px-3 text-sm font-medium text-ink shadow-card transition-all focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-hidden"
          >
            <option value="none">Mặc định</option>
            <option value="asc">Giá thấp đến cao</option>
            <option value="desc">Giá cao đến thấp</option>
          </select>
        </div>
      </div>

      {/* Tabs navigation */}
      <div role="tablist" aria-label="Nhóm tour" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'border border-border bg-surface-card text-ink-muted hover:border-primary/40 hover:text-ink'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* States: Loading, Empty, Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
          {[1, 2, 3, 4].map((n) => (
            <TourCardSkeleton key={n} />
          ))}
        </div>
      ) : tours.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-surface-card p-12 text-center text-ink-muted">
          <p className="text-sm font-semibold">Chưa có chương trình tour phù hợp danh mục này.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tours.map((tour) => (
              <TourCardItem key={tour.id} tour={tour} onBookNow={onBookTour} />
            ))}
          </div>
          <div className="flex justify-center pt-4">
            <Link to="/tours" className={buttonClasses('outline', 'md')}>
              Xem Tất Cả Tour Tuyển Chọn ➔
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
