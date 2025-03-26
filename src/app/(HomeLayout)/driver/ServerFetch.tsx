import { fetchDriverOrders } from "@/lib/data/driver";
import ClientContent from "./Content";

export const ServerFetch = async () => {
  const orders = await fetchDriverOrders();
  return <ClientContent orders={orders} />;
};

export default ServerFetch;
