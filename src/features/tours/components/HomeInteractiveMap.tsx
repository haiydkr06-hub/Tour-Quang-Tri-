import { useState } from 'react';
import { Link } from 'react-router';
import type { MapPoint } from '../types';
import { buttonClasses } from '@/components/ui/Button';
import { SectionHeading } from '@/components/SectionHeading';
import { HomeMapCanvas } from './HomeMapCanvas';

export interface HomeInteractiveMapProps {
  points: MapPoint[];
}

export function HomeInteractiveMap({ points }: HomeInteractiveMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (points.length === 0) return null;
  // Dữ liệu tải bất đồng bộ: chưa chọn điểm nào thì mặc định điểm đầu tiên
  const selected = points.find((p) => p.id === selectedId) ?? points[0];

  return (
    <section id="ban-do" aria-labelledby="ban-do-title" className="reveal scroll-mt-24">
      <SectionHeading
        id="ban-do-title"
        eyebrow="Tọa Độ Di Tích"
        title="Bản Đồ Điểm Đến Quảng Trị"
        aside={
          <p className="max-w-md text-sm leading-relaxed text-ink-muted">
            Định vị các địa danh lịch sử, danh thắng tự nhiên và trung tâm hành hương trên mảnh đất Quảng Trị.
          </p>
        }
      />

      <div className="relative isolate overflow-hidden rounded-[28px] bg-navy p-4 shadow-pop sm:p-6 lg:p-8">
        <div aria-hidden="true" className="absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Bản đồ + danh sách điểm (danh sách giúp chọn dễ trên điện thoại) */}
          <div className="space-y-4 lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="whitespace-nowrap rounded-full border border-primary-light/30 bg-primary/20 px-3 py-1 font-bold text-primary-light">
                📍 Bản đồ vệ tinh số hóa
              </span>
              <span className="whitespace-nowrap font-medium text-on-media/60">{points.length} Điểm đến được định vị</span>
            </div>

            <HomeMapCanvas points={points} selectedId={selected.id} onSelect={(pt) => setSelectedId(pt.id)} />

            <div className="flex flex-wrap gap-2">
              {points.map((pt) => {
                const isActive = pt.id === selected.id;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedId(pt.id)}
                    className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-on-media/15 bg-on-media/5 text-on-media/80 hover:border-primary-light hover:text-on-media'
                    }`}
                  >
                    {pt.name}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap justify-between gap-2 border-t border-on-media/10 pt-3 text-[11px] text-on-media/50">
              <span>Khu vực: Quảng Trị (Vĩ tuyến 17)</span>
              <span>Tọa độ trung tâm: 16.82°N, 107.10°E</span>
            </div>
          </div>

          {/* Thẻ chi tiết điểm đang chọn — key để chạy lại hiệu ứng khi đổi điểm */}
          <article key={selected.id} className="flex flex-col overflow-hidden rounded-3xl bg-surface-card shadow-card dark:bg-surface-alt animate-fade-up lg:col-span-2">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-alt">
              <img src={selected.imageUrl} alt={selected.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <span className="absolute bottom-3 left-3 rounded-full bg-scrim/75 px-2.5 py-1 text-[11px] font-semibold text-on-media backdrop-blur-md">
                {selected.latitude}° N, {selected.longitude}° E
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="text-xl font-extrabold text-ink">{selected.name}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">📌 {selected.address}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{selected.description}</p>
              <Link to={`/tours/${selected.tourId}`} className={buttonClasses('primary', 'md', 'mt-5 w-full')}>
                Xem tour ghé thăm điểm này ➔
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
