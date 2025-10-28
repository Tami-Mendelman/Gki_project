"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type WishItem = { id: number; title: string; price: number; image: string };

type WishlistState = {
  items: WishItem[];
  add: (item: WishItem) => void;
  remove: (id: number) => void;
  toggle: (item: WishItem) => void;
  has: (id: number) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => (s.items.some((x) => x.id === item.id) ? s : { items: [...s.items, item] })),
      remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
      toggle: (item) => {
        const exists = get().items.some((x) => x.id === item.id);
        return exists
          ? set((s) => ({ items: s.items.filter((x) => x.id !== item.id) }))
          : set((s) => ({ items: [...s.items, item] }));
      },
      has: (id) => get().items.some((x) => x.id === id),
      clear: () => set({ items: [] }),
    }),
    {
      name: "gki-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
      version: 1,
    }
  )
);
