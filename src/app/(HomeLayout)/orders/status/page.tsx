"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Clock, Package, Truck } from "lucide-react";
import { useState } from "react";

const orderStatuses = {
  ORD001: {
    status: "delivered",
    items: ["Mighty Super Cheesecake", "Berry Bliss Smoothie"],
    total: 22.97,
    date: "2024-03-28",
    estimatedDelivery: "2024-03-28",
  },
  ORD002: {
    status: "in-transit",
    items: ["Spinach and Cheese Pasta", "Garlic Bread"],
    total: 18.98,
    date: "2024-03-28",
    estimatedDelivery: "2024-03-29",
  },
  ORD003: {
    status: "processing",
    items: ["Berry Bliss Smoothie", "Chicken Caesar Salad"],
    total: 19.98,
    date: "2024-03-28",
    estimatedDelivery: "2024-03-29",
  },
};

export default function OrderStatusPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDetails, setOrderDetails] = useState<
    (typeof orderStatuses)["ORD001"] | null
  >(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderDetails(
      orderStatuses[orderNumber as keyof typeof orderStatuses] || null
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case "in-transit":
        return <Truck className="h-6 w-6 text-blue-500" />;
      case "delivered":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      default:
        return <Package className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Order Status</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Check Your Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                placeholder="Enter your order number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <Button type="submit" className="mt-auto">
              Check Status
            </Button>
          </form>
        </CardContent>
      </Card>

      {orderDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(orderDetails.status)}
              Order #{orderNumber} -{" "}
              {orderDetails.status.charAt(0).toUpperCase() +
                orderDetails.status.slice(1)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Order Items:</h3>
                <ul className="list-disc list-inside">
                  {orderDetails.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span>${orderDetails.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span>{orderDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span>{orderDetails.estimatedDelivery}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
