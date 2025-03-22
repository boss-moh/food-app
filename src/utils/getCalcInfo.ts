import { OrderItemClientType, SummaryType } from "@/constants";

export const getCalcInfo = (items: OrderItemClientType[]): SummaryType => {
  const subtotal = items.reduce((a, b) => a + b.product.price * b.quantity, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;
  return { subtotal, tax, total };
};

export default getCalcInfo;
