import { Order } from '@/models/order';
import { create } from 'zustand';

interface OrderStoreState {
  orders: Order[];
  currentPage: number;
  itemsPerPage: number;
  setOrders: (orders: Order[]) => void;
  deleteOrder: (id: string) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useOrderStore = create<OrderStoreState>((set) => ({
  orders: [],
  currentPage: 1,
  itemsPerPage: 10,

  // Actions
  setOrders: (orders: Order[]) => set({ orders }),
  deleteOrder: (id: string) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),
  nextPage: () =>
    set((state) => ({
      currentPage: Math.min(
        state.currentPage + 1,
        Math.ceil(state.orders.length / state.itemsPerPage)
      ),
    })),
  prevPage: () =>
    set((state) => ({
      currentPage: Math.max(state.currentPage - 1, 1),
    })),
}));
