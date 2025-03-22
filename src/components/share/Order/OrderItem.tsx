import Image from "next/image";

import { OrderItemClientType } from "@/constants";
import { formatPrice } from "@/utils";

export const OrderItem = ({ item }: { item: OrderItemClientType }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 overflow-hidden rounded-md">
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            ${item.product.price.toFixed(2)} × {item.quantity}
          </span>
          <span>{formatPrice(item.product.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
