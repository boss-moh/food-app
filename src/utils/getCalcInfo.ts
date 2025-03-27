import { orderDetailsType, SummaryType } from "@/constants";

interface Item {
  quantity: number;
  product: {
    price: number;
  };
}

export const getCalcInfo = (items: Item[]): SummaryType => {
  const subTotal = items.reduce((a, b) => a + b.product.price * b.quantity, 0);
  const tax = subTotal * 0.1; // Assuming 10% tax
  const total = subTotal + tax;
  return { subTotal, tax, total };
};
export const getSummary = (order:orderDetailsType): SummaryType => {
  const {subTotal, tax, total} = order
  
  return { subTotal, tax, total };
};

export default getCalcInfo;
