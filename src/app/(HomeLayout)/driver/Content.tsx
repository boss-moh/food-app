"use client";
import { getOrderOptions, OrderStatus } from "@/constants";

import {
  LoadingButton,
  Location,
  OrderDetails,
  OrderList,
  Selecter,
  UserInfo,
} from "@/components/share";
import { AlertCircle } from "lucide-react";
import { useUpdateStatus } from "@/hooks";
import { useEffect, useState } from "react";
import { DriversOrder } from "@/lib/data/driver";

const options = getOrderOptions(false);

interface ClientContentProps {
  orders: DriversOrder[];
}

export const ClientContent = ({ orders }: ClientContentProps) => {
  const [ordersDetails, setOrdersDetails] = useState<DriversOrder[]>(
    () => orders
  );
  const {
    defaultStatus,
    ChangeStatus,
    orderDetails,
    isLoading,
    hasChanges,
    onClick,
    ChangeOrder,
  } = useUpdateStatus(null);

  useEffect(() => {
    if (orderDetails) {
      const newOrdersDetails = ordersDetails.map((order) =>
        order.id === orderDetails.id ? orderDetails : order
      );
      setOrdersDetails(newOrdersDetails as DriversOrder[]);
    }
  }, [orderDetails]);
  return (
    <div className="grid justify-center md:justify-between gap-8 md:grid-cols-2 py-4">
      <OrderList
        className="order-2"
        onSelect={ChangeOrder}
        selectedId={orderDetails?.id}
        orders={ordersDetails}
      />
      <article aria-label="order details " className="order-1 md:order-10">
        {!orderDetails ? (
          <EmptyDeliveryFeedBack />
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3 gap-4 ">
              <p className="font-medium flex-shrink-0">Update Status:</p>
              <Selecter
                className="w-[200px]"
                options={options}
                defaultValue={defaultStatus}
                onChange={(status) => ChangeStatus(status as OrderStatus)}
              />
            </div>

            <div className="space-y-3">
              <UserInfo
                name={(orderDetails as DriversOrder).customer.name}
                phone={(orderDetails as DriversOrder).customer.phone}
              />
              <Location address={orderDetails.address} />
              <OrderDetails order={orderDetails} />
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <LoadingButton
                onClick={onClick}
                isLoading={isLoading}
                disabled={!hasChanges}
              >
                Save
              </LoadingButton>
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

const EmptyDeliveryFeedBack = () => (
  <div className="text-center py-12">
    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
    <h3 className="text-lg font-medium">No active delivery</h3>
    <p className="text-muted-foreground">
      Select a delivery from the list to view details
    </p>
  </div>
);

export default ClientContent;
