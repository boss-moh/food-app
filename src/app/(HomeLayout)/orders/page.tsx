import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Clock } from "lucide-react";
import { fetchOrders } from "@/lib";
import { auth } from "@/auth";
import { formatPrice, getCalcInfo } from "@/utils";
import { Status } from "@/components/share";

// const orders = [
//   {
//     id: "12345",
//     date: "March 25, 2024",
//     status: "processing",
//     total: 42.99,
//     estimatedDelivery: "30-45 minutes",
//     deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
//     items: [
//       { name: "Mighty Super Cheesecake", quantity: 1 },
//       { name: "Berry Bliss Smoothie", quantity: 1 },
//     ],
//   },
//   {
//     id: "12344",
//     date: "March 24, 2024",
//     status: "completed",
//     total: 67.5,
//     estimatedDelivery: "Delivered",
//     deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
//     items: [
//       { name: "Spinach and Cheese Pasta", quantity: 2 },
//       { name: "Fresh Glazed Donuts", quantity: 6 },
//     ],
//   },
// ];

export default async function OrdersPage() {
  const session = await auth();
  if (!session) return;
  const orders = await fetchOrders(session.user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="grid gap-6 lg:grid-cols-2 justify-center">
        {orders.map((order) => {
          const items = order.items.map((item) => ({
            quantity: item.quantity,
            price: item.product.price,
          }));

          const { total } = getCalcInfo(items);
          return (
            <Card key={order.id} className="max-w-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 leading-normal">
                      Order
                      <span className="truncate max-w-full  inline-block ">
                        #{order.id}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Placed on {order.createdAt.toDateString()}
                    </CardDescription>
                  </div>
                  <Status status={order.status}>{order.status}</Status>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 flex-col">
                  <div>
                    <h3 className="font-medium mb-2">Order Details</h3>
                    <p>Items: {order.items.length}</p>
                    <p>Total: {formatPrice(total)}</p>
                    {/* <p className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Estimated delivery: {"30-45 minutes"}
                    </p> */}
                  </div>
                  {/* </div> */}

                  {/* <div>
                    <h3 className="font-medium mb-2">Delivery Address</h3>
                    <p className="text-sm text-muted-foreground">
                      {"123 Main St, Apt 4B, New York, NY 10001"}
                    </p>
                  </div> */}

                  <div>
                    <h3 className="font-medium mb-2">Items</h3>
                    <ul className="space-y-1 text-sm">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.product.name}</span>
                          <span>x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Button variant="outline" className="w-full">
                    Track Order
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
