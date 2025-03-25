"use client";
import { OrderDetails, Selecter } from "@/components/share";
import { Button } from "@/components/ui/button";
import {
  API_END_POINT,
  OrderStatus,
  getOrderOptions,
  orderDetailsType,
} from "@/constants";
import { axios, useMutation } from "@/lib";
import { useState } from "react";

const options = getOrderOptions(false);

interface EditOrderProps {
  order: orderDetailsType;
}

export const EditOrder = ({ order }: EditOrderProps) => {
  const [orderDetails, setOrderDetails] = useState(() => order);
  const defaultStatus = orderDetails.status;
  const id = order.id;

  const [status, setStatus] = useState<OrderStatus>(defaultStatus);

  const hasChanges = status !== defaultStatus;

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await axios.put(API_END_POINT.ADMIN.ORDERS.CHANGE_STATUS, {
        status,
        id,
      });
    },
    onSuccess() {
      setOrderDetails({ ...orderDetails, status });
    },
  });

  const handleClick = () => {
    if (!hasChanges) return;
    if (isPending) return;
    mutate();
  };
  return (
    <>
      <div className="flex items-center justify-between mb-3 gap-4 ">
        <p className="font-medium flex-shrink-0">Update Status:</p>
        <Selecter
          className="w-[200px]"
          options={options}
          defaultValue={defaultStatus}
          onChange={(status) => setStatus(status as OrderStatus)}
        />
      </div>
      <OrderDetails order={orderDetails} />

      <div className="mt-8 flex justify-end gap-4">
        <Button onClick={handleClick} disabled={isPending || !hasChanges}>
          {isPending ? "Loading ..." : "Save"}
        </Button>
      </div>
    </>
  );
};
