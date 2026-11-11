import type { TravelArticle } from '../types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export interface ArticleDetailModalProps {
  article: TravelArticle | null;
  onClose: () => void;
  onExploreTour?: (tourId: number) => void;
}

export function ArticleDetailModal({ article, onClose, onExploreTour }: ArticleDetailModalProps) {
  if (!article) return null;

  return (
    <Modal
      isOpen={Boolean(article)}
      onClose={onClose}
      title={article.title}
      footer={
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" size="md" onClick={onClose}>
            Đóng
          </Button>
          {article.relatedTourId ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                onClose();
                onExploreTour?.(article.relatedTourId!);
              }}
            >
              Khám Phá Tour Liên Quan ➔
            </Button>
          ) : null}
        </div>
      }
    >
      <div className="space-y-5 text-sm text-ink">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{article.category}</Badge>
          <span className="text-xs text-ink-muted">⏱ {article.readTime}</span>
          <span className="text-xs text-ink-subtle">·</span>
          <span className="text-xs text-ink-muted">Ngày đăng: {article.date}</span>
        </div>

        {/* Cover image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-surface-alt">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Summary callout */}
        <p className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 font-medium leading-relaxed text-ink">
          {article.summary}
        </p>

        {/* Detailed paragraphs */}
        {article.content && article.content.length > 0 ? (
          <div className="space-y-3 leading-relaxed text-ink/90">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        ) : null}

        {/* Practical tips */}
        {article.tips && article.tips.length > 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-4">
            <h4 className="flex items-center gap-1.5 font-bold text-ink">
              <span>💡</span>
              <span>Bí quyết khi đi du lịch</span>
            </h4>
            <ul className="mt-2.5 space-y-1.5 text-xs text-ink-muted">
              {article.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
