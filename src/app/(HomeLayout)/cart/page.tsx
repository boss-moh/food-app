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
import { Clock, Truck } from "lucide-react";
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

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Truck className="mr-2 h-4 w-4" /> Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Estimated delivery time: 30-45 minutes</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Orders over 50 qualify for free delivery. Your order will be
                carefully packed and delivered to your doorstep.
              </p>
            </CardContent>
          </Card>
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
                Proceed to Checkout
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
