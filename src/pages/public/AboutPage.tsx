import { Link } from 'react-router';
import { PageHeader } from '@/components/PageHeader';
import { buttonClasses } from '@/components/ui/Button';

const VALUES = [
  {
    icon: '🏛️',
    title: 'Bảo Tồn Di Sản',
    text: 'Tôn vinh và lan tỏa giá trị lịch sử Thành Cổ, Đôi bờ Hiền Lương, Vĩ tuyến 17 và Địa đạo Vịnh Mốc đến bạn bè bốn phương.',
  },
  {
    icon: '🎯',
    title: 'Tour Cá Nhân Hóa',
    text: 'Hệ thống cho phép du khách tùy chọn điểm tham quan, chọn hướng dẫn viên bản địa am hiểu sâu sắc và phương tiện riêng.',
  },
  {
    icon: '🤝',
    title: 'Kết Nối Đối Tác',
    text: 'Hỗ trợ hướng dẫn viên và đơn vị vận tải Quảng Trị tiếp cận khách hàng trực tiếp, tối ưu thu nhập và nâng tầm dịch vụ lữ hành.',
  },
];

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Về Chúng Tôi"
        title="Cổng Thông Tin & Đặt Tour Du Lịch Quảng Trị"
        description="Dự án chuyên nghiệp thuộc khuôn khổ môn Web FrontEnd Nâng cao (INT.7.18) — Đại học Phú Xuân, ứng dụng React 19, TypeScript strict mode và React Router 8."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {VALUES.map((v, idx) => (
          <article
            key={v.title}
            style={{ animationDelay: `${idx * 90}ms` }}
            className="group rounded-3xl border border-border/80 bg-surface-card p-7 shadow-card transition-all duration-300 animate-fade-up hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
          >
            <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl transition-transform duration-300 group-hover:scale-110">
              {v.icon}
            </span>
            <h2 className="mt-5 text-lg font-bold text-ink">{v.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.text}</p>
          </article>
        ))}
      </div>

      <section className="relative isolate overflow-hidden rounded-3xl bg-navy px-6 py-12 text-center sm:px-12">
        <div aria-hidden="true" className="absolute -left-16 -top-16 -z-10 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-20 -right-10 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <h2 className="text-2xl font-extrabold text-on-media sm:text-3xl">Sẵn Sàng Cho Chuyến Đi Về Miền Di Sản?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-on-media/75 sm:text-base">
          Hãy bắt đầu hành trình của bạn ngay hôm nay cùng những người con đất lửa Quảng Trị.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/tours" className={buttonClasses('primary', 'lg')}>
            Xem Tất Cả Tour
          </Link>
          <Link to="/contact" className={buttonClasses('outline', 'lg', 'border-on-media/30 bg-transparent text-on-media hover:border-on-media hover:text-on-media')}>
            Liên Hệ Tư Vấn
          </Link>
        </div>
      </section>
    </div>
  );
}
