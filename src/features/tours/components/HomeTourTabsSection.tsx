import { useState, useEffect } from 'react';
import type { Tour, TourTab } from '../types';
import { getToursByTab } from '../service';
import { TourCardItem } from './TourCardItem';

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
    <section id="tour-noi-bat" className="scroll-mt-20 space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Hành Trình Được Yêu Thích
          </span>
          <h2 className="text-2xl font-black text-ink sm:text-3xl">
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
            className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs text-ink focus:border-primary focus:outline-none"
          >
            <option value="none">Mặc định</option>
            <option value="asc">Giá thấp đến cao</option>
            <option value="desc">Giá cao đến thấp</option>
          </select>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'border border-border bg-surface-card text-ink hover:bg-surface-alt'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-96 rounded-3xl bg-surface-alt" />
          ))}
        </div>
      ) : tours.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center text-ink-muted">
          <p className="text-sm font-semibold">Chưa có chương trình tour phù hợp danh mục này.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCardItem key={tour.id} tour={tour} onBookNow={onBookTour} />
          ))}
        </div>
      )}
    </section>
  );
}
