import { create } from 'zustand';

export interface CustomTourStoreState {
  selectedDestinationIds: string[];
  days: number;
  guests: number;
  selectedGuideId: number | null;
  selectedVehicleId: string | null;

  toggleDestination: (id: string) => void;
  setDays: (days: number) => void;
  setGuests: (guests: number) => void;
  setSelectedGuide: (guideId: number | null) => void;
  setSelectedVehicle: (vehicleId: string | null) => void;
  resetBuilder: () => void;
}

export const useCustomTourStore = create<CustomTourStoreState>((set) => ({
  selectedDestinationIds: ['thanh-co', 'hien-luong'],
  days: 1,
  guests: 2,
  selectedGuideId: 101,
  selectedVehicleId: 'car-4',

  toggleDestination: (id: string) =>
    set((state) => {
      const exists = state.selectedDestinationIds.includes(id);
      return {
        selectedDestinationIds: exists
          ? state.selectedDestinationIds.filter((item) => item !== id)
          : [...state.selectedDestinationIds, id],
      };
    }),

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
