export const formatPrice = (num: number) => `$${num.toFixed(2)}`;
export const formatDate = (date: Date) =>
  date.toLocaleString("en-US", {
    // year: "2-digit",
    // month: "short",
    // day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
