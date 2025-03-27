"use client";
import { LoadingButton, OrderDetails, Selecter } from "@/components/share";

import { OrderStatus, getOrderOptions, orderDetailsType } from "@/constants";
import { useUpdateStatus } from "@/hooks";

const options = getOrderOptions(false);

interface EditOrderProps {
  order: orderDetailsType;
}

export const EditOrder = ({ order }: EditOrderProps) => {
  const {
    defaultStatus,
    ChangeStatus,
    orderDetails,
    isLoading,
    hasChanges,
    onClick,
  } = useUpdateStatus(order);
  return (
    <>
      <div className="flex items-center justify-between mb-3 gap-4 ">
        <p className="font-medium flex-shrink-0">Update Status:</p>
        <Selecter
          className="w-[200px]"
          options={options}
          defaultValue={defaultStatus}
          onChange={(status) => ChangeStatus(status as OrderStatus)}
        />
      </div>
      <OrderDetails order={orderDetails as orderDetailsType} />

      <div className="mt-8 flex justify-end gap-4">
        <LoadingButton
          onClick={onClick}
          isLoading={isLoading}
          disabled={!hasChanges}
        >
          Save
        </LoadingButton>
      </div>
    </>
  );
};
