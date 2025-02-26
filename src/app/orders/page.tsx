import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";
import { statusType } from "../admin/page";

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>Placed on {order.date}</CardDescription>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusStyles[order.status as statusType]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-medium mb-2">Order Details</h3>
                  <div className="space-y-1 text-sm">
                    <p>Items: {order.items.length}</p>
                    <p>Total: ${order.total.toFixed(2)}</p>
                    <p className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Estimated delivery: {order.estimatedDelivery}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Delivery Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.deliveryAddress}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  <ul className="space-y-1 text-sm">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name}</span>
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
        ))}
      </div>
    </div>
  );
}

const orders = [
  {
    id: "12345",
    date: "March 25, 2024",
    status: "processing",
    total: 42.99,
    estimatedDelivery: "30-45 minutes",
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    items: [
      { name: "Mighty Super Cheesecake", quantity: 1 },
      { name: "Berry Bliss Smoothie", quantity: 1 },
    ],
  },
  {
    id: "12344",
    date: "March 24, 2024",
    status: "completed",
    total: 67.5,
    estimatedDelivery: "Delivered",
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    items: [
      { name: "Spinach and Cheese Pasta", quantity: 2 },
      { name: "Fresh Glazed Donuts", quantity: 6 },
    ],
  },
];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};
