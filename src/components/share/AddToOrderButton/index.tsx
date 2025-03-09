"use client";
import { Button } from "@/components/ui/button";
import { itemType, useOrder } from "@/store";
import { ShoppingBag } from "lucide-react";

type AddToOrderButtonProps = {
  item: itemType;
};
export const AddToOrderButton = ({ item }: AddToOrderButtonProps) => {
  const { addItem } = useOrder();
  return (
    <Button className="w-full " onClick={() => addItem(item)}>
      <ShoppingBag className="mr-2 h-5 w-5" /> Add to Order
    </Button>
  );
};

export default AddToOrderButton;
