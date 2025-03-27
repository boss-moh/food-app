import { API_END_POINT, orderDetailsType, OrderStatus } from "@/constants";
import { axios } from "@/lib";
import { DriversOrder } from "@/lib/data/driver";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useUpdateStatus = (
  order: orderDetailsType | null | DriversOrder
) => {
  const [orderDetails, setOrderDetails] = useState(() => order);
  const defaultStatus = orderDetails?.status;
  const id = orderDetails?.id;

  const [status, setStatus] = useState<OrderStatus | undefined>(defaultStatus);

  const hasChanges = status !== defaultStatus;

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await axios.put(API_END_POINT.ORDERS.CHANGE_STATUS, {
        status,
        id,
      });
    },
    onSuccess() {
      setOrderDetails({
        ...(orderDetails as orderDetailsType),
        status: status as OrderStatus,
      });
    },
  });

  const handleClick = () => {
    if (!hasChanges) return;
    if (isPending) return;
    mutate();
  };

  const ChangeStatus = (status: OrderStatus) => setStatus(status);
  const ChangeOrder = (order: orderDetailsType) => setOrderDetails(order);

  return {
    defaultStatus,
    orderDetails,
    status,
    onClick: handleClick,
    hasChanges,
    ChangeStatus,
    ChangeOrder,
    isLoading: isPending,
  };
};
