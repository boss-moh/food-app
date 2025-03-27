"use client";
import { Button } from "@/components/ui/button";
import { OrderItemClientType } from "@/constants";
import { toast } from "sonner";
import { useOrder } from "@/store";
import { ShoppingBag } from "lucide-react";

type AddToOrderButtonProps = {
  item: OrderItemClientType;
};

export const AddToOrderButton = ({ item }: AddToOrderButtonProps) => {
  const { addItem, checkIsInOrder } = useOrder();
  const isInOrder = checkIsInOrder(item.product.id);
  const { isAvailable } = item.product;

  const handleOnClick = () => {
    if (!isAvailable) {
      toast.error("Faild To Added to cart!", {
        description: `${item.product.name} is not It available`,
      });
      return;
    }
    addItem(item);
    toast.success("Added to cart!", {
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
