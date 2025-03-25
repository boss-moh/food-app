import { SummaryType } from "@/constants";

interface Item {
  quantity: number;
  product: {
    price: number;
  };
}

export const getCalcInfo = (items: Item[]): SummaryType => {
  const subtotal = items.reduce((a, b) => a + b.product.price * b.quantity, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;
  return { subtotal, tax, total };
};

export default getCalcInfo;
