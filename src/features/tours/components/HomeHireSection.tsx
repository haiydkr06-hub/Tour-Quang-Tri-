import { useState } from 'react';
import { Link } from 'react-router';
import type { TourGuide, VehicleOption } from '@/features/custom-tour/types';
import { Card } from '@/components/ui/Card';
import { Button, buttonClasses } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export interface HomeHireSectionProps {
  guides: TourGuide[];
  vehicles: VehicleOption[];
  onHireGuide: (guide: TourGuide) => void;
  onHireVehicle: (vehicle: VehicleOption) => void;
}

export function HomeHireSection({
  guides,
  vehicles,
  onHireGuide,
  onHireVehicle,
}: HomeHireSectionProps) {
  const [tab, setTab] = useState<'guide' | 'vehicle'>('guide');
  const formatVND = (v: number) => `${v.toLocaleString('vi-VN')} đ/ngày`;

  return (
    <section id="thue-dich-vu" className="reveal scroll-mt-24 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary before:h-px before:w-6 before:bg-primary before:content-['']">
            Dịch Vụ Đồng Hành
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[2rem] sm:leading-tight">
            Thuê Hướng Dẫn Viên & Xe Riêng
          </h2>
        </div>

        {/* Tab switch buttons */}
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface-card p-1">
          <button
            type="button"
            onClick={() => setTab('guide')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              tab === 'guide'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            👨‍💼 Hướng Dẫn Viên ({guides.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('vehicle')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              tab === 'vehicle'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            🚗 Xe & Tài Xế ({vehicles.length})
          </button>
        </div>
      </div>

      {/* Guides Grid */}
      {tab === 'guide' ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Card key={g.id} className="flex flex-col justify-between p-5 hover:border-primary/50 transition-all">
              <div>
                <div className="flex items-center gap-3.5">
                  <img
                    src={g.avatar}
                    alt={g.name}
                    className="h-14 w-14 rounded-full border border-border object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-base font-bold text-ink">{g.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-warning">
                      <span>★ {g.rating}</span>
                      <span className="text-ink-muted">({g.reviewsCount} đánh giá)</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs italic leading-relaxed text-ink-muted">
                  "{g.specialty}"
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.languages.map((l) => (
                    <Badge key={l} variant="neutral" className="text-[10px]">
                      {l}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] text-ink-muted">Chi phí dịch vụ:</span>
                  <span className="text-base font-extrabold text-primary">{formatVND(g.pricePerDay)}</span>
                </div>
                <Button variant="primary" size="sm" className="w-full" onClick={() => onHireGuide(g)}>
                  Thuê Hướng Dẫn Viên Ngay
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Vehicles Grid */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <Card key={v.id} className="flex flex-col justify-between p-5 hover:border-primary/50 transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-ink">{v.name}</h3>
                  <Badge variant="primary">{v.seats} chỗ</Badge>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                  {v.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-ink-muted">
                  <span>✓ Bao gồm tài xế bản địa</span>
                  <span>·</span>
                  <span>✓ Xăng dầu & cầu đường</span>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] text-ink-muted">Chi phí thuê xe:</span>
                  <span className="text-base font-extrabold text-primary">{formatVND(v.pricePerDay)}</span>
                </div>
                <Button variant="primary" size="sm" className="w-full" onClick={() => onHireVehicle(v)}>
                  Thuê Xe & Tài Xế Ngay
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Action banner to custom tour builder */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:flex-row">
        <div>
          <h4 className="text-base font-bold text-ink">Muốn tự lên lịch trình tham quan các di tích?</h4>
          <p className="mt-1 text-xs text-ink-muted">
            Kéo thả điểm đến, sắp xếp thứ tự tham quan và kết hợp cùng hướng dẫn viên, tài xế riêng.
          </p>
        </div>
        <Link to="/custom-tour" className={buttonClasses('outline', 'md', 'shrink-0')}>
          Tự Lên Lịch Trình Chi Tiết ➔
        </Link>
      </div>
    </section>
  );
}
