import { create } from "zustand";

type SettingsState = {
  selectedModelId: string;
  setSelectedModelId: (id: string) => void;
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  selectedModelId: "mikangpt3.5",
  setSelectedModelId: (id) => {
    set({ selectedModelId: id });
  },
}));
