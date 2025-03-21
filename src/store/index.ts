import { productType } from "@/constants";
import { getCalcInfo } from "@/utils";
import { create } from "zustand";

export type itemType = productType & { quantity: number };
interface useOrderType {
  items: itemType[];
  addItem: (item: itemType) => void;
  removeItem: (id: string) => void;
  update: (id: string, newQuantity: number) => void;
  calcOrder: () => { subtotal: number; tax: number; total: number };
  checkIsInOrder: (id: string) => boolean;
}

export const useOrder = create<useOrderType>((set, get) => ({
  items: [],
  addItem: (orderItem: itemType) => {
    set(({ items }) => {
      const isInOrder = !!items.find((item) => item.id === orderItem.id);
      if (isInOrder) return { items };

      return { items: [...items, orderItem] };
    });
  },
  removeItem: (id: string) => {
    set(({ items }) => {
      const newItems = items.filter((item) => item.id !== id);
      if (newItems.length === items.length) return { items };
      return { items: newItems };
    });
  },

  update(id, newQuantity) {
    set(({ items }) => {
      const newItems = items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );

      return { items: newItems };
    });
  },
  calcOrder: () => {
    const { items } = get();

    return getCalcInfo(items);
  },

  checkIsInOrder: (id: string) => {
    const { items } = get();

    return !!items.find((item) => item.id === id);
  },
}));
