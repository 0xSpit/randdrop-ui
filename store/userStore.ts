import { create } from "zustand";

export enum SupportedChain {
  injective = "injective",
  osmosis = "osmosis",
  stargaze = "stargaze",
  juno = "juno",
  aura = "aura",
}

interface userState {
  address: string;
  setAddress: (address: string) => void;

  chain: SupportedChain | "";
  setChain: (chain: SupportedChain) => void;
}

export const useUserStore = create<userState>()((set) => ({
  address: "",
  setAddress: (address: string) => set({ address }),

  chain: "",
  setChain: (chain: SupportedChain) => set({ chain }),
}));
