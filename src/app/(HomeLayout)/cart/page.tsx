"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrder } from "@/store";
import EmptyCart from "../../../components/share/cart/EmptyCart";
import { OrderConfirmationModal } from "./orderModel";
import { useState } from "react";
import { Summary } from "@/components/share";
import { CartItem } from "@/components/share/cart";

export default function CartPage() {
  const { removeItem, update, items, getOrderDetails } = useOrder();
  const summaryDetails = getOrderDetails();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {items.map((item) => (
            <CartItem
              update={update}
              removeItem={removeItem}
              {...item}
              key={item.product.id}
            />
          ))}
        </div>
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Summary {...summaryDetails} />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => setIsOrderModalOpen(true)}
              >
                Review your order.
              </Button>
            </CardFooter>
          </Card>
        </div>

        <OrderConfirmationModal
          items={items}
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
        />
      </div>
    </div>
  );
}
