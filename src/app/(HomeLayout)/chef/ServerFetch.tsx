import { fetchChefOrders } from "@/lib/data/chef";
import ClientContent from "./Content";
import { EmptyOrder } from "@/components/share";

export const ServerFetch = async () => {
  const orders = await fetchChefOrders();
  if (!orders.length) return <EmptyOrder />;
  return <ClientContent orders={orders} />;
};

export default ServerFetch;
