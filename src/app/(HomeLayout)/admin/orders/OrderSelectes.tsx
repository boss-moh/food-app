"use client";
import { Selecter } from "@/components/share";
import { useSelecter } from "@/hooks";
import { makeOptions } from "@/utils";
import { OrderStatus } from "@prisma/client";

export const orderStatusOptions = makeOptions(
  Object.values(OrderStatus),
  (value) => ({
    value,
    name: value,
  })
);

export const OrderSelecter = () => {
  const settings = useSelecter("status");

  return <Selecter {...settings} options={orderStatusOptions} />;
};

export default OrderSelecter;
