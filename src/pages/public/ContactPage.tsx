import { useState, type FormEvent, type ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/PageHeader';

const CONTACT_ROWS: { icon: string; label: string; value: ReactNode }[] = [
  { icon: '📍', label: 'Trụ sở chính', value: '128 Lê Duẩn, TP. Đông Hà, Tỉnh Quảng Trị' },
  {
    icon: '📞',
    label: 'Hotline 24/7',
    value: (
      <>
        <span className="font-bold text-primary">1900 6868</span> — (0233) 385 666
      </>
    ),
  },
  { icon: '✉️', label: 'Email', value: 'hotro@tourquangtri.vn' },
  { icon: '🕒', label: 'Giờ làm việc', value: '07:30 – 21:00 hàng ngày (kể cả Lễ, Tết)' },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Hỗ Trợ 24/7"
        title="Liên Hệ Với Chúng Tôi"
        description="Đội ngũ chuyên viên tư vấn tour Quảng Trị luôn sẵn sàng đồng hành cùng quý khách."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Card className="space-y-6 p-6 sm:p-8 lg:col-span-2">
          <h2 className="text-xl font-bold text-ink">Thông Tin Liên Lạc</h2>
          <ul className="space-y-4">
            {CONTACT_ROWS.map((row) => (
              <li key={row.label} className="flex items-start gap-3.5">
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg">
                  {row.icon}
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">{row.label}</p>
                  <p className="mt-0.5 text-sm font-medium text-ink">{row.value}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl bg-surface-alt p-4">
            <h3 className="text-sm font-bold text-ink">Văn phòng đón khách:</h3>
            <p className="mt-1 text-sm text-ink-muted">Trung tâm xúc tiến du lịch thị xã Quảng Trị, gần đài tưởng niệm Thành Cổ.</p>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 lg:col-span-3">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center space-y-3 py-10 text-center animate-fade-up" role="status">
              <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-3xl">✅</span>
              <h3 className="text-xl font-bold text-ink">Gửi Tin Nhắn Thành Công!</h3>
              <p className="text-sm text-ink-muted">Cảm ơn quý khách. Tư vấn viên sẽ liên hệ lại trong vòng 15 phút.</p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>Gửi tin nhắn khác</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="mb-2 text-xl font-bold text-ink">Gửi Yêu Cầu Tư Vấn</h2>
              <TextField id="contact-name" label="Họ và tên" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField id="contact-email" label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <TextField id="contact-phone" label="Số điện thoại" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
              </div>
              <div>
                <label htmlFor="contact-msg" className="mb-1.5 block text-sm font-semibold text-ink">Nội dung cần hỗ trợ</label>
                <textarea
                  id="contact-msg"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-y rounded-xl border border-border bg-surface-card px-3.5 py-3 text-sm text-ink placeholder:text-ink-subtle transition-all focus:border-primary focus:outline-hidden focus:ring-4 focus:ring-primary/15"
                  placeholder="Quý khách cần hỗ trợ lịch trình, giá vé di tích hay thuê xe..."
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full">Gửi Yêu Cầu</Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
