import { useUser } from "@/hooks/useUser";
import { Conversation, Message, Model } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { create } from "zustand";

type SettingsState = {
  selectedModelId: string;
  setSelectedModelId: (id: string) => void;
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  selectedModelId: "mikangpt4",
  setSelectedModelId: (id) => {
    set({ selectedModelId: id });
  },
}));
