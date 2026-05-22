import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Coffee, Order } from "@/types";

interface CartStore {
  items: CartItem[];
  order: Order | null;

  addItem: (coffee: Coffee, quantity: number) => void;
  removeItem: (coffeeId: string) => void;
  updateQuantity: (coffeeId: string, quantity: number) => void;
  clearCart: () => void;
  setOrder: (order: Order) => void;

  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      order: null,

      addItem: (coffee, quantity) => {
        const { items } = get();
        const existing = items.find((i) => i.coffee.id === coffee.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.coffee.id === coffee.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...items, { coffee, quantity }] });
        }
      },

      removeItem: (coffeeId) => {
        set({ items: get().items.filter((i) => i.coffee.id !== coffeeId) });
      },

      updateQuantity: (coffeeId, quantity) => {
        set({
          items: get().items.map((i) =>
            i.coffee.id === coffeeId ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      setOrder: (order) => set({ order }),

      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, i) => acc + i.coffee.price * i.quantity, 0),
    }),
    {
      name: "coffee-delivery-cart", // chave no localStorage
    },
  ),
);
