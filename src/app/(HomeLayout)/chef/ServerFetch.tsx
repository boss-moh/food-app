import { fetchChefOrders } from "@/lib/data/chef";
import ClientContent from "./Content";

export const ServerFetch = async () => {
  const orders = await fetchChefOrders();
  return <ClientContent orders={orders} />;
};

export default ServerFetch;
