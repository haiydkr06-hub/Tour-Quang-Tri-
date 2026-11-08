import { Link } from 'react-router';
import { Card } from '@/components/ui/Card';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Về Chúng Tôi</span>
        <h1 className="text-3xl font-black text-ink sm:text-4xl">Cổng Thông Tin & Đặt Tour Du Lịch Quảng Trị</h1>
        <p className="text-sm text-ink-muted max-w-2xl mx-auto">
          Dự án chuyên nghiệp thuộc khuôn khổ môn Web FrontEnd Nâng cao (INT.7.18) — Đại học Phú Xuân, ứng dụng React 19, TypeScript strict mode và React Router 8.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3">
          <span className="text-3xl">🏛️</span>
          <h2 className="text-lg font-bold text-ink">Bảo Tồn Di Sản</h2>
          <p className="text-xs text-ink-muted leading-relaxed">
            Tôn vinh và lan tỏa giá trị lịch sử Thành Cổ, Đôi bờ Hiền Lương, Vĩ tuyến 17 và Địa đạo Vịnh Mốc đến bạn bè bốn phương.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <span className="text-3xl">🎯</span>
          <h2 className="text-lg font-bold text-ink">Tour Cá Nhân Hóa</h2>
          <p className="text-xs text-ink-muted leading-relaxed">
            Hệ thống cho phép du khách tùy chọn điểm tham quan, chọn hướng dẫn viên bản địa am hiểu sâu sắc và phương tiện riêng.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <span className="text-3xl">🤝</span>
          <h2 className="text-lg font-bold text-ink">Kết Nối Đối Tác</h2>
          <p className="text-xs text-ink-muted leading-relaxed">
            Hỗ trợ hướng dẫn viên và đơn vị vận tải Quảng Trị tiếp cận khách hàng trực tiếp, tối ưu thu nhập và nâng tầm dịch vụ lữ hành.
          </p>
        </Card>
      </div>

      <div className="rounded-3xl border border-border bg-surface-card p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-ink">Sẵn Sàng Cho Chuyến Đi Về Miền Di Sản?</h3>
        <p className="text-xs text-ink-muted">Hãy bắt đầu hành trình của bạn ngay hôm nay cùng những người con đất lửa Quảng Trị.</p>
        <div className="flex justify-center gap-3">
          <Link to="/tours" className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primary-dark transition-colors">
            Xem Tất Cả Tour
          </Link>
          <Link to="/contact" className="rounded-xl border border-border bg-surface px-5 py-2.5 text-xs font-bold text-ink hover:bg-surface-alt transition-colors">
            Liên Hệ Tư Vấn
          </Link>
        </div>
      </div>
    </div>
  );
}
