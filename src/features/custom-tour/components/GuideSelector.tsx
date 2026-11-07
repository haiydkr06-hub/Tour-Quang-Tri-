import type { TourGuide } from '../types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface GuideSelectorProps {
  guides: TourGuide[];
  selectedGuideId: number | null;
  onSelect: (id: number | null) => void;
}

/**
 * Thành phần lựa chọn Hướng dẫn viên bản địa Quảng Trị đồng hành.
 */
export function GuideSelector({
  guides,
  selectedGuideId,
  onSelect,
}: GuideSelectorProps) {
  const formatVND = (v: number) => `${v.toLocaleString('vi-VN')} đ/ngày`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">
          2. Chọn Hướng dẫn viên bản địa (Tùy chọn)
        </h2>
        {selectedGuideId !== null ? (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-xs text-ink-muted hover:text-danger cursor-pointer"
          >
            Bỏ chọn HDV
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {guides.map((g) => {
          const isSelected = selectedGuideId === g.id;
          return (
            <Card
              key={g.id}
              onClick={() => onSelect(isSelected ? null : g.id)}
              className={`flex cursor-pointer flex-col justify-between p-4 transition-all ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : 'hover:border-border/80'
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={g.avatar}
                    alt={g.name}
                    className="h-12 w-12 rounded-full object-cover border border-border"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-ink">{g.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-warning">
                      <span>★ {g.rating}</span>
                      <span className="text-ink-muted">({g.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-ink-muted italic">
                  "{g.specialty}"
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {g.languages.map((lang) => (
                    <Badge key={lang} variant="neutral" className="text-[10px]">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                <span className="font-bold text-primary">{formatVND(g.pricePerDay)}</span>
                <span className="text-[11px] font-medium text-ink">
                  {isSelected ? '✓ Đã chọn' : '+ Chọn'}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
