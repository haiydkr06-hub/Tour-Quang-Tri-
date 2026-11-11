import { Link } from 'react-router';
import { BrandLogo } from './BrandLogo';

// Nội dung giữ nguyên như bản cũ — chỉ tổ chức lại thành mảng để trình bày gọn.
const DESTINATION_LINKS = [
  'Thành Cổ Quảng Trị',
  'Địa Đạo Vịnh Mốc',
  'Cầu Hiền Lương - Vĩ Tuyến 17',
  'Đảo Cồn Cỏ Xanh',
  'Chiến Trường Khe Sanh',
  'Thánh Địa La Vang',
];

const SERVICE_LINKS = [
  { label: 'Tự Thiết Kế Tour', to: '/custom-tour' },
  { label: 'Tour Trọn Gói Giá Tốt', to: '/#tour-noi-bat' },
  { label: 'Đăng Ký Đối Tác HDV', to: '/partner' },
  { label: 'Bộ Sưu Tập Chủ Đề', to: '/#uu-dai' },
  { label: 'Đánh Giá Từ Khách Hàng', to: '/#danh-gia' },
];

const POLICIES = [
  'Bảo hiểm du lịch trọn gói',
  'Chính sách hoàn hủy tour',
  'Điều khoản sử dụng',
  'Bảo mật thông tin khách hàng',
];

const PAYMENTS = ['VNPAY', 'MOMO', 'VISA', 'ATM/IB'];

const headingClass = 'mb-4 text-xs font-bold uppercase tracking-[0.14em] text-on-media';
const linkClass = 'text-sm text-on-media/65 transition-colors hover:text-primary-light';

export function Footer() {
  return (
    <footer id="lien-he" className="mt-20 bg-navy text-on-media">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Contact Info */}
          <div className="space-y-5 lg:col-span-2">
            <BrandLogo onDark tagline="Cổng Thông Tin & Đặt Tour Cá Nhân Hóa" />

            <p className="max-w-sm text-sm leading-relaxed text-on-media/65">
              Đơn vị tiên phong cung cấp giải pháp đặt tour di sản, lịch sử và sinh thái biển đảo Quảng Trị với hướng dẫn viên bản địa am hiểu sâu sắc.
            </p>

            <ul className="space-y-2.5 text-sm text-on-media/75">
              <li className="flex gap-2.5"><span aria-hidden="true">📍</span>Trụ sở: 128 Lê Duẩn, TP. Đông Hà, Tỉnh Quảng Trị</li>
              <li className="flex gap-2.5">
                <span aria-hidden="true">📞</span>
                <span>Hotline 24/7: <span className="font-bold text-primary-light">1900 6868</span> - (0233) 385 666</span>
              </li>
              <li className="flex gap-2.5"><span aria-hidden="true">✉️</span>Email: hotro@tourquangtri.vn</li>
              <li className="flex gap-2.5"><span aria-hidden="true">📜</span>Giấy phép lữ hành: 45-012/2026/TCDL-GP LHQT</li>
            </ul>
          </div>

          {/* Column 1: Di sản nổi bật */}
          <nav aria-label="Điểm đến di sản">
            <h2 className={headingClass}>Điểm Đến Di Sản</h2>
            <ul className="space-y-2.5">
              {DESTINATION_LINKS.map((label) => (
                <li key={label}><Link to="/#kham-pha" className={linkClass}>{label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Column 2: Dịch vụ & Trải nghiệm */}
          <nav aria-label="Dịch vụ nổi bật">
            <h2 className={headingClass}>Dịch Vụ Nổi Bật</h2>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}><Link to={item.to} className={linkClass}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Chính sách & Thanh toán */}
          <div>
            <h2 className={headingClass}>Chính Sách & Hỗ Trợ</h2>
            <ul className="space-y-2.5 text-sm text-on-media/65">
              {POLICIES.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>

            <p className="mb-2 mt-6 text-xs font-bold text-on-media">Thanh toán an toàn:</p>
            <div className="flex flex-wrap gap-2">
              {PAYMENTS.map((name) => (
                <span
                  key={name}
                  className="rounded-lg border border-on-media/15 bg-on-media/5 px-2.5 py-1 text-[11px] font-bold tracking-wide text-on-media/80"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-on-media/10 pt-6 text-xs text-on-media/55 sm:flex-row">
          <p className="text-center sm:text-left">© 2026 Tour Quảng Trị (phu-xuan-react). Bản quyền thuộc về Dự án Quảng Trị Travel.</p>
          <div className="flex gap-5">
            <Link to="/" className="transition-colors hover:text-primary-light">Trang chủ</Link>
            <Link to="/custom-tour" className="transition-colors hover:text-primary-light">Tự tạo tour</Link>
            <Link to="/login" className="transition-colors hover:text-primary-light">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
