import { create } from "zustand";

interface LocationState {
  lat: number;
  lon: number;
  setLat: (lat: number) => void;
  setLon: (lon: number) => void;
  key?: number;
}

export const useLocationStore = create<LocationState>((set) => ({
  lat: 0,
  lon: 0,
  key: +new Date(),
  setLat: (lat) => set({ lat }),
  setLon: (lon) => set({ lon }),
  setKey: () => set({ key: +new Date() }),
}));
