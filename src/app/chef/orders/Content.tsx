"use client";
import { ChangeStatusOptions, orderDetailsType } from "@/constants";
import {
  OrderDetails,
  OrderList,
  UpdateOrderStatus,
  UnSelectedItem,
} from "@/components/share";
import { useState } from "react";
interface ClientContentProps {
  orders: orderDetailsType[];
}

const options = ChangeStatusOptions.CHEF;

export const ClientContent = ({ orders }: ClientContentProps) => {
  const [selectedId, setSelectedId] = useState<string>();
  const orderDetails = orders.find((order) => order.id === selectedId);

  return (
    <div className="grid justify-center md:justify-between gap-4 md:grid-cols-2 py-4">
      <OrderList
        className="order-2"
        onSelect={(order) => setSelectedId(order.id)}
        selectedId={selectedId}
        orders={orders}
      />
      <article aria-label="order details " className="order-1 md:order-10">
        {!orderDetails || !selectedId ? (
          <UnSelectedItem />
        ) : (
          <UpdateOrderStatus
            selectedId={selectedId}
            options={options}
            defaultStatus={orderDetails.status}
          >
            <OrderDetails order={orderDetails} />
          </UpdateOrderStatus>
        )}
      </article>
    </div>
  );
};

export default ClientContent;
