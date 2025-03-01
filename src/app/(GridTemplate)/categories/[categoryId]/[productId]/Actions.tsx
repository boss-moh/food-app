"use client";
import { AddToCardButton } from "@/components/share";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export const ActionsButtons = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity(Math.max(1, quantity + amount));
  };

  // const handleAddToCart = () => {
  //   console.log(`Added ${quantity} (s) to cart`);
  //   // Here you would typically update your cart state or send a request to your backend
  // };
  return (
    <>
      <div className="flex items-center mt-6">
        <Label htmlFor="quantity" className="mr-4">
          Quantity
        </Label>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            aria-label="increase quantity by one "
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Number.parseInt(e.target.value)))
            }
            className="w-16 mx-2 text-center"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            aria-label="decrease quantity by one "
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <AddToCardButton />
      </div>
    </>
  );
};
