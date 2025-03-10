"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { itemType, useOrder } from "@/store";
import { ShoppingBag } from "lucide-react";

type AddToOrderButtonProps = {
  item: itemType;
};
export const AddToOrderButton = ({ item }: AddToOrderButtonProps) => {
  const { addItem, checkIsInOrder } = useOrder();
  const isInOrder = checkIsInOrder(item.id);
  const handleOnClick = () => {
    addItem(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };
  return (
    <Button disabled={isInOrder} className="w-full " onClick={handleOnClick}>
      {isInOrder ? (
        <>
          <ShoppingBag className="mr-2 h-5 w-5" />
          <span>Inside Order</span>
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-5 w-5" />
          <span>Add to Order</span>
        </>
      )}
    </Button>
  );
};

export default AddToOrderButton;
