type itemType = {
  quantity: number;
  price: number;
};

export const getCalcInfo = (items: itemType[]) => {
  const subtotal = items.reduce((a, b) => a + b.price * b.quantity, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;
  return { subtotal, tax, total };
};

export default getCalcInfo;
