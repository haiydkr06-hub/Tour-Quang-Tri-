import type { Tour } from '../types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export interface TourDetailViewProps {
  tour: Tour;
  onBookNow: (tour: Tour) => void;
  onBack: () => void;
}

/**
 * Presentational View: Hiển thị chi tiết hành trình, lịch trình thời gian và giá tour.
 */
export function TourDetailView({ tour, onBookNow, onBack }: TourDetailViewProps) {
  const formatPrice = (val: number) => `${val.toLocaleString('vi-VN')} đ`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center text-sm font-medium text-ink-muted hover:text-ink cursor-pointer"
      >
        ← Quay lại danh sách tour
      </button>

      {/* Ảnh bìa & tiêu đề */}
      <div className="relative aspect-21/9 w-full overflow-hidden rounded-2xl bg-surface-alt border border-border">
        <img
          src={tour.imageUrl}
          alt={tour.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-scrim/70 via-scrim/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-on-media">
          <Badge variant="primary" className="mb-2">
            Mã Tour #{tour.id} • {tour.duration}
          </Badge>
          <h1 className="text-2xl font-extrabold sm:text-4xl text-on-media">
            {tour.name}
          </h1>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cột thông tin chi tiết & Lịch trình */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h2 className="text-lg font-bold text-ink">Giới thiệu chuyến đi</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {tour.description}
            </p>

            <h3 className="mt-6 text-sm font-bold text-ink">Điểm đến di tích:</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {tour.locations.map((loc) => (
                <Badge key={loc} variant="neutral">
                  📍 {loc}
                </Badge>
              ))}
            </div>

            <h3 className="mt-6 text-sm font-bold text-ink">Điểm nổi bật:</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              {tour.highlights.map((h, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-success">✔</span> {h}
                </li>
              ))}
            </ul>
          </Card>

          {/* Lịch trình chi tiết */}
          <Card>
            <h2 className="text-lg font-bold text-ink">Lịch trình chi tiết</h2>
            <div className="mt-4 space-y-4 border-l-2 border-primary/30 pl-4">
              {tour.itinerary.map((item, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="font-bold text-primary text-xs">
                    {item.time}
                  </span>
                  <p className="text-sm font-medium text-ink mt-0.5">
                    {item.activity}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Cột đặt vé & Báo giá */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <p className="text-xs text-ink-muted">Giá trọn gói một khách</p>
            <p className="mt-1 text-3xl font-extrabold text-primary">
              {formatPrice(tour.price)}
            </p>

            <div className="mt-6 space-y-3 text-xs text-ink-muted border-t border-border pt-4">
              <p>✔ Bao gồm xe đưa đón khứ hồi</p>
              <p>✔ Bao gồm vé tham quan di tích</p>
              <p>✔ Hướng dẫn viên bản địa theo suốt tuyến</p>
              <p>✔ Bảo hiểm du lịch đầy đủ</p>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="mt-6 w-full"
              onClick={() => onBookNow(tour)}
            >
              Đặt Tour Này
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
