import { EmptyOrder, OrderDetails } from "@/components/share";
import { fetchOrdersByUserId } from "@/lib";
export const UserOrders = async ({ userId }: { userId: string }) => {
  const orders = await fetchOrdersByUserId(userId);
  if (!orders.length) return <EmptyOrder />;
  return (
    <div className="grid gap-6 lg:grid-cols-2 justify-center">
      {orders.map((order) => (
        <OrderDetails key={order.id} order={order} />
      ))}
    </div>
  );
};

export default UserOrders;
