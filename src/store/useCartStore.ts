import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/data';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          if (existingItem) {
            const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
            return {
              items: state.items.map((item) =>
                item.product.id === product.id ? { ...item, quantity: newQuantity } : item
              ),
            };
          }
          const finalQuantity = Math.min(quantity, product.stock);
          if (finalQuantity <= 0) return state; // out of stock
          return { items: [...state.items, { product, quantity: finalQuantity }] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => {
          return {
            items: state.items.map((item) => {
              if (item.product.id === productId) {
                const newQuantity = Math.max(1, Math.min(quantity, item.product.stock));
                return { ...item, quantity: newQuantity };
              }
              return item;
            }),
          };
        });
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
