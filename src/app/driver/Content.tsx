"use client";
import { ChangeStatusOptions } from "@/constants";

import {
  Location,
  OrderDetails,
  OrderList,
  UnSelectedItem,
  UpdateOrderStatus,
  UserInfo,
} from "@/components/share";
import { useState } from "react";
import { DriversOrder } from "@/data/driver";

const options = ChangeStatusOptions.DRIVER;

interface ClientContentProps {
  orders: DriversOrder[];
}

export const ClientContent = ({ orders }: ClientContentProps) => {
  const [selectedId, setSelectedId] = useState<string>();
  const orderDetails = orders.find((order) => order.id === selectedId);
  return (
    <div className="grid justify-center md:justify-between gap-8 md:grid-cols-2 py-4">
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
            <div className="space-y-3">
              <UserInfo
                name={orderDetails.customer.name}
                phone={orderDetails.customer.phone}
                id={orderDetails.customer.id}
              />
              <Location address={orderDetails.address} />
              <OrderDetails order={orderDetails} />
            </div>
          </UpdateOrderStatus>
        )}
      </article>
    </div>
  );
};

export default ClientContent;
