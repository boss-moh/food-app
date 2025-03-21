"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useOrder } from "@/store";
import { Clock, Minus, Plus, Trash2, Truck } from "lucide-react";
import Image from "next/image";
import EmptyCart from "./EmptyCart";
import { formatPrice } from "@/utils";
import { OrderConfirmationModal } from "./orderModel";
import { useState } from "react";
import Summary from "./Summary";

export default function CartPage() {
  const { removeItem, update, items } = useOrder();

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
            <Card key={item.id} className="mb-4">
              <CardContent className="flex items-center p-4">
                <div className="relative w-20 h-20 mr-4">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.price)} each
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    disabled={item.quantity <= 1}
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (item.quantity <= 1) return;
                      update(item.id, item.quantity - 1);
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      update(item.id, Number.parseInt(e.target.value))
                    }
                    className="w-16 mx-2 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => update(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-4"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
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
              <Summary />
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
