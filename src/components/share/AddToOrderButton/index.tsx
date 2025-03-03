"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export const AddToOrderButton = () => {
  return (
    <Button className="w-full " onClick={() => {}}>
      <ShoppingBag className="mr-2 h-5 w-5" /> Add to Order
    </Button>
  );
};

export default AddToOrderButton;
