import { create } from 'zustand';

export interface CustomTourStoreState {
  /** Thứ tự trong mảng chính là thứ tự tham quan trong lịch trình */
  selectedDestinationIds: string[];
  days: number;
  guests: number;
  selectedGuideId: number | null;
  selectedVehicleId: string | null;

  toggleDestination: (id: string) => void;
  /** Thêm địa danh vào lịch trình tại vị trí `index` (mặc định cuối danh sách) */
  addDestination: (id: string, index?: number) => void;
  removeDestination: (id: string) => void;
  /** Đổi chỗ một điểm trong lịch trình từ vị trí `from` sang `to` (kéo thả / nút lên-xuống) */
  moveDestination: (from: number, to: number) => void;
  setDays: (days: number) => void;
  setGuests: (guests: number) => void;
  setSelectedGuide: (guideId: number | null) => void;
  setSelectedVehicle: (vehicleId: string | null) => void;
  resetBuilder: () => void;
}

/** Hàm thuần: chèn `id` vào `list` tại `index` (bỏ bản cũ nếu đã có). */
export function insertAt(list: string[], id: string, index = list.length): string[] {
  const without = list.filter((item) => item !== id);
  const safeIndex = Math.max(0, Math.min(index, without.length));
  return [...without.slice(0, safeIndex), id, ...without.slice(safeIndex)];
}

/** Hàm thuần: di chuyển phần tử từ `from` sang `to`, giữ nguyên các phần tử khác. */
export function moveItem(list: string[], from: number, to: number): string[] {
  if (from < 0 || from >= list.length || to < 0 || to >= list.length || from === to) return list;
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

export const useCustomTourStore = create<CustomTourStoreState>((set) => ({
  selectedDestinationIds: ['thanh-co', 'hien-luong'],
  days: 1,
  guests: 2,
  selectedGuideId: 101,
  selectedVehicleId: 'car-4',

  toggleDestination: (id: string) =>
    set((state) => ({
      selectedDestinationIds: state.selectedDestinationIds.includes(id)
        ? state.selectedDestinationIds.filter((item) => item !== id)
        : [...state.selectedDestinationIds, id],
    })),

  addDestination: (id: string, index?: number) =>
    set((state) => ({ selectedDestinationIds: insertAt(state.selectedDestinationIds, id, index) })),

  removeDestination: (id: string) =>
    set((state) => ({
      selectedDestinationIds: state.selectedDestinationIds.filter((item) => item !== id),
    })),

  moveDestination: (from: number, to: number) =>
    set((state) => ({ selectedDestinationIds: moveItem(state.selectedDestinationIds, from, to) })),

  setDays: (days: number) => set({ days: Math.max(1, days) }),
  setGuests: (guests: number) => set({ guests: Math.max(1, guests) }),
  setSelectedGuide: (selectedGuideId: number | null) => set({ selectedGuideId }),
  setSelectedVehicle: (selectedVehicleId: string | null) => set({ selectedVehicleId }),

  resetBuilder: () =>
    set({
      selectedDestinationIds: [],
      days: 1,
      guests: 2,
      selectedGuideId: null,
      selectedVehicleId: null,
    }),
}));
