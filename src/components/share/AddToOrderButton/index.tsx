"use client";
import { Button } from "@/components/ui/button";
import { OrderItemClientType } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { useOrder } from "@/store";
import { ShoppingBag } from "lucide-react";

type AddToOrderButtonProps = {
  item: OrderItemClientType;
};

export const AddToOrderButton = ({ item }: AddToOrderButtonProps) => {
  const { addItem, checkIsInOrder } = useOrder();
  const isInOrder = checkIsInOrder(item.product.id);

  const handleOnClick = () => {
    addItem(item);
    toast({
      title: "Added to cart!",
      description: `${item.product.name} has been added to your cart.`,
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
