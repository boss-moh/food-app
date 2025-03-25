import { makeOptions } from "@/utils";
import { OrderStatus } from "@/constants";

export const getOrderOptions = (withAll: boolean) =>
  makeOptions(
    Object.values(OrderStatus),
    (value) => ({
      value,
      name: value,
    }),
    withAll
  );
