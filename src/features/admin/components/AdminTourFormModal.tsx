import { useState, type FormEvent } from 'react';
import type { AdminTourItem } from '../types';
import { Modal } from '@/components/ui/Modal';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';

export interface AdminTourFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<AdminTourItem, 'id'>) => void;
}

/**
 * Modal Form thêm mới một tour tham quan di tích lịch sử Quảng Trị.
 */
export function AdminTourFormModal({
  isOpen,
  onClose,
  onSubmit,
}: AdminTourFormModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(700000);
  const [duration, setDuration] = useState('1 Ngày');
  const [locationsCount, setLocationsCount] = useState(3);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      price: Number(price),
      duration,
      locationsCount: Number(locationsCount),
      isActive: true,
    });

    setName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Thêm Tour Di Tích Mới"
      footer={
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="primary" form="add-tour-form" type="submit">
            Lưu & Xuất Bản
          </Button>
        </div>
      }
    >
      <form id="add-tour-form" onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Tên hành trình tour *"
          placeholder="Ví dụ: Về nguồn Đồi Chắt Bút — Khe Sanh"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Giá tour (VND) *"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          <TextField
            label="Thời lượng tour *"
            placeholder="1 Ngày hoặc 2N1Đ"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <TextField
          label="Số lượng điểm di tích ghé thăm"
          type="number"
          value={locationsCount}
          onChange={(e) => setLocationsCount(Number(e.target.value))}
          required
        />
      </form>
    </Modal>
  );
}
