import { useState, type FormEvent } from 'react';
import { Card } from '@/components/ui/Card';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Hỗ Trợ 24/7</span>
        <h1 className="text-3xl font-black text-ink sm:text-4xl">Liên Hệ Với Chúng Tôi</h1>
        <p className="text-sm text-ink-muted">Đội ngũ chuyên viên tư vấn tour Quảng Trị luôn sẵn sàng đồng hành cùng quý khách.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-5">
          <h2 className="text-lg font-bold text-ink">Thông Tin Liên Lạc</h2>
          <div className="space-y-3 text-xs text-ink-muted">
            <p>📍 <strong>Trụ sở chính:</strong> 128 Lê Duẩn, TP. Đông Hà, Tỉnh Quảng Trị</p>
            <p>📞 <strong>Hotline 24/7:</strong> <span className="text-primary font-bold">1900 6868</span> — (0233) 385 666</p>
            <p>✉️ <strong>Email:</strong> hotro@tourquangtri.vn</p>
            <p>🕒 <strong>Giờ làm việc:</strong> 07:30 – 21:00 hàng ngày (kể cả Lễ, Tết)</p>
          </div>
          <div className="border-t border-border pt-4">
            <h3 className="text-xs font-bold text-ink mb-1.5">Văn phòng đón khách:</h3>
            <p className="text-xs text-ink-muted">Trung tâm xúc tiến du lịch thị xã Quảng Trị, gần đài tưởng niệm Thành Cổ.</p>
          </div>
        </Card>

        <Card className="p-6">
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <span className="text-4xl">✅</span>
              <h3 className="text-lg font-bold text-ink">Gửi Tin Nhắn Thành Công!</h3>
              <p className="text-xs text-ink-muted">Cảm ơn quý khách. Tư vấn viên sẽ liên hệ lại trong vòng 15 phút.</p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>Gửi tin nhắn khác</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-ink mb-2">Gửi Yêu Cầu Tư Vấn</h2>
              <TextField id="contact-name" label="Họ và tên" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <TextField id="contact-email" label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <TextField id="contact-phone" label="Số điện thoại" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
              </div>
              <div>
                <label htmlFor="contact-msg" className="block text-xs font-semibold text-ink mb-1">Nội dung cần hỗ trợ</label>
                <textarea id="contact-msg" rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:border-primary focus:outline-none" placeholder="Quý khách cần hỗ trợ lịch trình, giá vé di tích hay thuê xe..." required />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full">Gửi Yêu Cầu</Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
