import { OrderItemClientType, SummaryType } from "@/constants";
import { getCalcInfo } from "@/utils";
import { create } from "zustand";

interface useOrderType {
  items: OrderItemClientType[];
  addItem: (item: OrderItemClientType) => void;
  removeItem: (id: string) => void;
  update: (id: string, newQuantity: number) => void;
  getOrderDetails: () => SummaryType;
  checkIsInOrder: (id: string) => boolean;
  clear: () => void;
}

export const useOrder = create<useOrderType>((set, get) => ({
  items: [],
  addItem: (orderItem: OrderItemClientType) => {
    set(({ items }) => {
      const isInOrder = !!items.find(
        (item) => item.product.id === orderItem.product.id
      );
      if (isInOrder) return { items };

      return { items: [...items, orderItem] };
    });
  },
  removeItem: (id: string) => {
    set(({ items }) => {
      const newItems = items.filter((item) => item.product.id !== id);
      if (newItems.length === items.length) return { items };
      return { items: newItems };
    });
  },

  update(id, newQuantity) {
    set(({ items }) => {
      const newItems = items.map((item) =>
        item.product.id === id ? { ...item, quantity: newQuantity } : item
      );

      return { items: newItems };
    });
  },
  getOrderDetails: () => {
    const { items } = get();

    return getCalcInfo(items);
  },

  checkIsInOrder: (id: string) => {
    const { items } = get();

    return !!items.find((item) => item.product.id === id);
  },

  clear: () => set((state) => ({ ...state, items: [] })),
}));
