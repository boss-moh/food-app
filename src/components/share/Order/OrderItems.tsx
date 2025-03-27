import { ScrollArea } from "@/components/ui/scroll-area";
import OrderItem from "./OrderItem";
import { OrderItemClientType } from "@/constants";
import { cn } from "@/lib";

type OrderItemsProps = {
  items: OrderItemClientType[];
  className?: string;
};

export const OrderItems = ({ items, className = "" }: OrderItemsProps) => {
  const count = items.length;
  const height = count >= 3 ? 300 : count * 100;
  const classNameFinal = cn(`h-[${height}px] `, className);
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Order Items</h4>
      <ScrollArea className={` rounded-md border ${classNameFinal}`}>
        <div className="p-4 space-y-4">
          {items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default OrderItems;
