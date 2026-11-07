import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';

export interface TourHeroBannerProps {
  onExploreClick?: () => void;
}

/**
 * Banner quảng bá du lịch Quảng Trị (TourHeroBanner) với hình ảnh và thông điệp truyền cảm hứng.
 */
export function TourHeroBanner({ onExploreClick }: TourHeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-surface-card border border-border px-6 py-12 sm:px-12 sm:py-16 shadow-xs">
      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          ⭐ Du lịch Di sản & Lịch sử Cách mạng
        </span>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl sm:leading-tight">
          Hành Trình Về Mảnh Đất Anh Hùng{' '}
          <span className="text-primary">Quảng Trị</span>
        </h1>

        <p className="mt-4 text-base text-ink-muted sm:text-lg">
          Trải nghiệm những trang sử vàng chói lọi của dân tộc qua các địa danh huyền thoại:
          Thành Cổ, Vĩ tuyến 17, Cầu Hiền Lương, Địa đạo Vịnh Mốc và Nghĩa trang Trường Sơn.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/custom-tour">
            <Button variant="primary" size="lg">
              Tự Thiết Kế Tour Cá Nhân
            </Button>
          </Link>
          {onExploreClick ? (
            <Button variant="outline" size="lg" onClick={onExploreClick}>
              Xem Danh Sách Tour ↓
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4 sm:pt-8">
        <div>
          <p className="text-2xl font-bold text-primary">5+</p>
          <p className="text-xs text-ink-muted">Di tích Quốc gia đặc biệt</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-ink">100%</p>
          <p className="text-xs text-ink-muted">Hướng dẫn viên bản địa</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-ink">4.9 ★</p>
          <p className="text-xs text-ink-muted">Đánh giá từ khách tham quan</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary">24/7</p>
          <p className="text-xs text-ink-muted">Hỗ trợ lịch trình linh hoạt</p>
        </div>
      </div>
    </div>
  );
}
