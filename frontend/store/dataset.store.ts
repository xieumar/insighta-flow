import { create } from "zustand";
import { UserProfile } from "../types";

interface DatasetState {
  results: UserProfile[];
  total: number;
  loading: boolean;
  setResults: (results: UserProfile[], total: number) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useDatasetStore = create<DatasetState>((set) => ({
  results: [],
  total: 0,
  loading: false,

  setResults: (results, total) => set({ results, total }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ results: [], total: 0, loading: false }),
}));
