import type { AdminTourItem } from '../types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface AdminTourManagerProps {
  tours: AdminTourItem[];
  onAddNew: () => void;
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Presentational View: Bảng quản lý danh mục Tour du lịch (Thêm, Bật/Tắt, Xóa).
 */
export function AdminTourManager({
  tours,
  onAddNew,
  onToggleStatus,
  onDelete,
}: AdminTourManagerProps) {
  const formatVND = (v: number) => `${v.toLocaleString('vi-VN')} đ`;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h3 className="text-base font-bold text-ink">Quản Lý Danh Mục Tour</h3>
          <p className="text-xs text-ink-muted">Danh sách các tour đang được công khai và quản trị</p>
        </div>
        <Button variant="primary" size="sm" onClick={onAddNew}>
          + Thêm Tour Mới
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-ink-muted">
              <th className="pb-3 font-semibold">Tên Tour</th>
              <th className="pb-3 font-semibold">Giá Vé</th>
              <th className="pb-3 font-semibold">Thời Lượng</th>
              <th className="pb-3 font-semibold">Địa Danh</th>
              <th className="pb-3 font-semibold">Trạng Thái</th>
              <th className="pb-3 text-right font-semibold">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-surface-alt/40 transition-colors">
                <td className="py-3.5 font-bold text-ink max-w-xs pr-4">
                  {tour.name}
                </td>
                <td className="py-3.5 font-semibold text-primary">
                  {formatVND(tour.price)}
                </td>
                <td className="py-3.5 text-ink-muted">{tour.duration}</td>
                <td className="py-3.5 text-ink-muted">{tour.locationsCount} điểm</td>
                <td className="py-3.5">
                  <Badge variant={tour.isActive ? 'success' : 'neutral'}>
                    {tour.isActive ? 'Đang mở' : 'Tạm ẩn'}
                  </Badge>
                </td>
                <td className="py-3.5 text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] py-1 px-2"
                    onClick={() => onToggleStatus(tour.id)}
                  >
                    {tour.isActive ? 'Ẩn' : 'Hiện'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="text-[11px] py-1 px-2"
                    onClick={() => onDelete(tour.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
