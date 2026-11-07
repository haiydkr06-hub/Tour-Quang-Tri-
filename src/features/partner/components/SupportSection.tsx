import { useState, useEffect } from 'react';
import type { FaqItem } from '../types';
import { getFaqs } from '../service';
import { Card } from '@/components/ui/Card';

/**
 * Presentational View: Khu vực Hỏi đáp FAQ và Hotline Hỗ trợ khách hàng du lịch Quảng Trị.
 */
export function SupportSection() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    getFaqs().then(setFaqs);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="bg-primary/5 border-primary/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-primary">
              Trung Tâm Hỗ Trợ & Điều Hành Tour Quảng Trị
            </h3>
            <p className="mt-1 text-xs text-ink-muted">
              Đường dây nóng hỗ trợ khẩn cấp du khách, kết nối Hướng dẫn viên và Tài xế 24/7.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-ink-muted">Hotline khẩn cấp:</span>
            <p className="text-xl font-extrabold text-primary">1900 6872 (Miễn cước)</p>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-base font-bold text-ink mb-3">
          Câu hỏi thường gặp & Hướng dẫn quy định di tích
        </h3>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <Card key={faq.id} className="p-4">
              <h4 className="text-sm font-bold text-ink flex items-center gap-2">
                <span className="text-primary font-mono">Q:</span>
                {faq.question}
              </h4>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed pl-5 border-l-2 border-border">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
