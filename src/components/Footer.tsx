import { Link } from 'react-router';

export function Footer() {
  return (
    <footer id="lien-he" className="border-t border-border bg-surface-card text-ink transition-colors">
      {/* Main Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-black shadow-sm">
                QT
              </span>
              <div>
                <span className="text-xl font-black text-primary">Tour Quảng Trị</span>
                <p className="text-[10px] text-ink-muted">Cổng Thông Tin & Đặt Tour Cá Nhân Hóa</p>
              </div>
            </Link>

            <p className="text-xs text-ink-muted leading-relaxed max-w-sm">
              Đơn vị tiên phong cung cấp giải pháp đặt tour di sản, lịch sử và sinh thái biển đảo Quảng Trị với hướng dẫn viên bản địa am hiểu sâu sắc.
            </p>

            <div className="space-y-1.5 text-xs text-ink-muted">
              <p>📍 Trụ sở: 128 Lê Duẩn, TP. Đông Hà, Tỉnh Quảng Trị</p>
              <p>📞 Hotline 24/7: <span className="font-bold text-primary">1900 6868</span> - (0233) 385 666</p>
              <p>✉️ Email: <span className="text-ink">hotro@tourquangtri.vn</span></p>
              <p>📜 Giấy phép lữ hành: 45-012/2026/TCDL-GP LHQT</p>
            </div>
          </div>

          {/* Column 1: Di sản nổi bật */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink">Điểm Đến Di Sản</h4>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li><Link to="/#kham-pha" className="hover:text-primary transition-colors">Thành Cổ Quảng Trị</Link></li>
              <li><Link to="/#kham-pha" className="hover:text-primary transition-colors">Địa Đạo Vịnh Mốc</Link></li>
              <li><Link to="/#kham-pha" className="hover:text-primary transition-colors">Cầu Hiền Lương - Vĩ Tuyến 17</Link></li>
              <li><Link to="/#kham-pha" className="hover:text-primary transition-colors">Đảo Cồn Cỏ Xanh</Link></li>
              <li><Link to="/#kham-pha" className="hover:text-primary transition-colors">Chiến Trường Khe Sanh</Link></li>
              <li><Link to="/#kham-pha" className="hover:text-primary transition-colors">Thánh Địa La Vang</Link></li>
            </ul>
          </div>

          {/* Column 2: Dịch vụ & Trải nghiệm */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink">Dịch Vụ Nổi Bật</h4>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li><Link to="/custom-tour" className="hover:text-primary transition-colors">Tự Thiết Kế Tour</Link></li>
              <li><Link to="/#tour-noi-bat" className="hover:text-primary transition-colors">Tour Trọn Gói Giá Tốt</Link></li>
              <li><Link to="/partner" className="hover:text-primary transition-colors">Đăng Ký Đối Tác HDV</Link></li>
              <li><Link to="/#uu-dai" className="hover:text-primary transition-colors">Bộ Sưu Tập Chủ Đề</Link></li>
              <li><Link to="/#danh-gia" className="hover:text-primary transition-colors">Đánh Giá Từ Khách Hàng</Link></li>
            </ul>
          </div>

          {/* Column 3: Chính sách & Thanh toán */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink">Chính Sách & Hỗ Trợ</h4>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li><span className="hover:text-primary cursor-pointer">Bảo hiểm du lịch trọn gói</span></li>
              <li><span className="hover:text-primary cursor-pointer">Chính sách hoàn hủy tour</span></li>
              <li><span className="hover:text-primary cursor-pointer">Điều khoản sử dụng</span></li>
              <li><span className="hover:text-primary cursor-pointer">Bảo mật thông tin khách hàng</span></li>
            </ul>

            <div className="pt-2">
              <p className="text-[11px] font-bold text-ink mb-1.5">Thanh toán an toàn:</p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-ink-muted">
                <span className="rounded bg-surface border border-border px-2 py-1">VNPAY</span>
                <span className="rounded bg-surface border border-border px-2 py-1">MOMO</span>
                <span className="rounded bg-surface border border-border px-2 py-1">VISA</span>
                <span className="rounded bg-surface border border-border px-2 py-1">ATM/IB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
          <p>© 2026 Tour Quảng Trị (phu-xuan-react). Bản quyền thuộc về Dự án Quảng Trị Travel.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <Link to="/custom-tour" className="hover:text-primary transition-colors">Tự tạo tour</Link>
            <Link to="/login" className="hover:text-primary transition-colors">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
