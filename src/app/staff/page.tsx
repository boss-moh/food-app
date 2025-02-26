"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { useState } from "react";

const orders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    items: [
      { name: "Mighty Super Cheesecake", quantity: 1 },
      { name: "Berry Bliss Smoothie", quantity: 2 },
    ],
    status: "preparing",
    assignedTo: "Chef Alice",
    orderTime: "2024-03-26T10:30:00Z",
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    items: [
      { name: "Spinach and Cheese Pasta", quantity: 1 },
      { name: "Garlic Bread", quantity: 1 },
    ],
    status: "ready",
    assignedTo: "Chef Bob",
    orderTime: "2024-03-26T10:45:00Z",
  },
  // Add more orders as needed
];

export default function StaffDashboard() {
  const [filter, setFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Staff Dashboard</h1>
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Current Orders</h2>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter orders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Order #{order.id}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {new Date(order.orderTime).toLocaleTimeString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{order.customerName}</p>
                  <ul className="mt-2 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item.quantity}x {item.name}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Assigned to: {order.assignedTo}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={order.status === "ready" ? "default" : "outline"}
                  >
                    {order.status === "preparing" && "Mark as Ready"}
                    {order.status === "ready" && "Mark as Delivered"}
                    {order.status === "delivered" && "Delivered"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Your Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your work schedule will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
