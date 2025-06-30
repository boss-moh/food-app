import { fetchDriverOrders } from "@/data/driver";
import ClientContent from "./Content";
import { EmptyOrder } from "@/components/share";

export const ServerFetch = async () => {
  const orders = await fetchDriverOrders();
  if (!orders.length) return <EmptyOrder />;
  return <ClientContent orders={orders} />;
};

export default ServerFetch;
