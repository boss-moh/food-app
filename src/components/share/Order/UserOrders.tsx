import { EmptyOrder, OrderDetails } from "@/components/share";
import { fetchOrdersByUserId } from "@/lib";
export const UserOrders = async ({ userId }: { userId: string }) => {
  const orders = await fetchOrdersByUserId(userId);
  if (!orders.length) return <EmptyOrder />;
  return orders.map((order) => <OrderDetails key={order.id} order={order} />);
};

export default UserOrders;
