import { create } from "zustand";

const useUiStore = create((set, get) => ({
  showHeaderMenu: false,
  setShowHeaderMenu: (val) => {
    set({ showHeaderMenu: val });
  },
}));

export default useUiStore;
