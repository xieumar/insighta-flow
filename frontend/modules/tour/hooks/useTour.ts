import { create } from "zustand";

interface TourState {
  isActive: boolean;
  start: () => void;
  end: () => void;
}

export const useTour = create<TourState>((set) => ({
  isActive: false,
  start: () => set({ isActive: true }),
  end: () => set({ isActive: false }),
}));
