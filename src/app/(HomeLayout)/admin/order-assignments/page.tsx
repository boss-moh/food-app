"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const initialOrders = [
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
    status: "preparing",
    assignedTo: "Chef Bob",
    orderTime: "2024-03-26T10:45:00Z",
  },
  {
    id: "ORD003",
    customerName: "Alice Johnson",
    items: [
      { name: "Berry Bliss Smoothie", quantity: 1 },
      { name: "Chicken Caesar Salad", quantity: 1 },
    ],
    status: "preparing",
    assignedTo: "Chef Charlie",
    orderTime: "2024-03-26T11:00:00Z",
  },
  // Add more orders as needed
];

const staff = [
  { id: 1, name: "Chef Alice" },
  { id: 2, name: "Chef Bob" },
  { id: 3, name: "Chef Charlie" },
  { id: 4, name: "Chef David" },
];

export default function OrderAssignmentsPage() {
  const [orders, setOrders] = useState(initialOrders);

  const handleAssignment = (orderId: string, chefName: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, assignedTo: chefName } : order
      )
    );
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Order Assignments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Order Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity}x {item.name}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                {new Date(order.orderTime).toLocaleString()}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Select
                  value={order.assignedTo}
                  onValueChange={(value) => handleAssignment(order.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Assign to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((chef) => (
                      <SelectItem key={chef.id} value={chef.name}>
                        {chef.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
