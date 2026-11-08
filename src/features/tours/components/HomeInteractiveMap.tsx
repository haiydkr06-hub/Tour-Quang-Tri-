import { useState } from 'react';
import { Link } from 'react-router';
import type { MapPoint } from '../types';

export interface HomeInteractiveMapProps {
  points: MapPoint[];
}

export function HomeInteractiveMap({ points }: HomeInteractiveMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(points[0] ?? null);

  if (!points || points.length === 0) return null;

  return (
    <section id="ban-do" className="scroll-mt-20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Tọa Độ Di Tích
          </span>
          <h2 className="text-2xl font-black text-ink sm:text-3xl">
            Bản Đồ Điểm Đến Quảng Trị
          </h2>
        </div>
        <p className="text-xs text-ink-muted max-w-md">
          Định vị các địa danh lịch sử, danh thắng tự nhiên và trung tâm hành hương trên mảnh đất Quảng Trị.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-3xl border border-border bg-surface-card p-4 sm:p-6 shadow-xl">
        {/* Interactive Visual Map Card */}
        <div className="relative h-[360px] sm:h-[420px] lg:col-span-2 overflow-hidden rounded-2xl border border-border bg-surface-alt flex flex-col justify-between p-6">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')" }} />
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-card/90 via-surface-card/50 to-transparent" />

          {/* Top header on map */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 px-3 py-1 text-xs font-bold text-primary">
              📍 Bản đồ vệ tinh số hóa
            </span>
            <span className="text-xs font-medium text-ink-muted">
              {points.length} Điểm đến được định vị
            </span>
          </div>

          {/* Interactive Marker Pins */}
          <div className="relative z-10 my-auto grid grid-cols-3 sm:grid-cols-4 gap-3 py-6">
            {points.map((pt) => {
              const isSelected = selectedPoint?.id === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => setSelectedPoint(pt)}
                  className={`group relative flex flex-col items-center gap-1.5 rounded-2xl p-2.5 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/30'
                      : 'bg-surface-card/90 backdrop-blur-md border border-border hover:border-primary text-ink'
                  }`}
                >
                  <span className="text-lg">📍</span>
                  <span className="text-[11px] font-bold line-clamp-1 leading-tight">
                    {pt.name}
                  </span>
                  <span className={`text-[9px] ${isSelected ? 'text-white/80' : 'text-ink-muted'}`}>
                    {pt.latitude.toFixed(2)}°N
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom coordinates bar */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-ink-muted border-t border-border/50 pt-2">
            <span>Khu vực: Quảng Trị (Vĩ tuyến 17)</span>
            <span>Tọa độ trung tâm: 16.82°N, 107.10°E</span>
          </div>
        </div>

        {/* Selected Marker Detail Card */}
        {selectedPoint && (
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 space-y-4">
            <div className="space-y-3">
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-surface-alt">
                <img
                  src={selectedPoint.imageUrl}
                  alt={selectedPoint.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-2 left-2 rounded-full bg-ink/75 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white">
                  {selectedPoint.latitude}° N, {selectedPoint.longitude}° E
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-ink">{selectedPoint.name}</h3>
                <p className="text-xs font-semibold text-primary mt-0.5">
                  📌 {selectedPoint.address}
                </p>
                <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                  {selectedPoint.description}
                </p>
              </div>
            </div>

            <Link
              to={`/tours/${selectedPoint.tourId}`}
              className="w-full rounded-xl bg-primary py-2.5 text-center text-xs font-bold text-white shadow-sm hover:bg-primary-dark transition-colors"
            >
              Xem tour ghé thăm điểm này ➔
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
