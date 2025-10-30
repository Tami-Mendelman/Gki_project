import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartStore = {
  items: CartItem[];
  popupOpen: boolean;
  add: (item: Omit<CartItem, "qty">, quantity?: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  total: () => number;
  setQty: (id: number, quantity: number) => void;
  openPopup: () => void;
  closePopup: () => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      popupOpen: false,

      add: (item, quantity = 1) => {
        const { items } = get();
        const existing = items.find((i) => i.id === item.id);

        let updatedItems;
        if (existing) {
          updatedItems = items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + quantity } : i
          );
        } else {
          updatedItems = [...items, { ...item, qty: quantity }];
        }

        set({ items: updatedItems });
      },

      remove: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      clear: () => set({ items: [] }),

      total: () =>
        get().items.reduce((acc, item) => acc + item.price * item.qty, 0),

      setQty: (id, quantity) => {
        if (quantity <= 0) {
          get().remove(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, qty: quantity } : item
          ),
        }));
      },

      openPopup: () => set({ popupOpen: true }),
      closePopup: () => set({ popupOpen: false }),
    }),
    {
      name: "cart-storage",
    }
  )
);
