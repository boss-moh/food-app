"use client";

import { Status } from "@/components/share";
import { orderDetailsType } from "@/constants";
import { formatDate } from "@/utils";
import { Clock } from "lucide-react";

interface OrderListProps {
  orders: orderDetailsType[];
  onSelect: (order: orderDetailsType) => void;
  selectedId?: string;
  className?: string;
}
export const OrderList = ({
  orders,
  onSelect,
  selectedId,
  className,
}: OrderListProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {orders.map((order) => (
        <div
          key={order.id}
          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
            selectedId === order.id
              ? "border-primary bg-primary/5"
              : "hover:bg-muted"
          }`}
          onClick={() => onSelect(order)}
        >
          <div className="flex justify-between items-start mb-2">
            <p className="font-medium flex items-center gap-2">
              <span>Order </span>
              <span className="truncate w-40 max-w-60 ">#{order.id}</span>
            </p>
            <Status status={order.status} />
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDate(order.createdAt)}</span>
            <span className="mx-2">•</span>
            <span>{order.items.length} items</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
