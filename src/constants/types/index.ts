import { Order, OrderItem } from "@prisma/client";
import { ReactNode } from "react";
import { productType, RoleStatus } from ".";

export type DynamicProps<T extends string> = {
  params: Promise<Record<T, string>>;
};
export type searchParamsProps<T extends string> = {
  searchParams: Promise<Record<T, string>>;
};
export type childrenProps = {
  children: ReactNode;
};

export type { product as productType } from "@prisma/client";
export type { Category as categoryType } from "@prisma/client";
export { RoleStatus } from "@prisma/client";

export type RoleType = (typeof RoleStatus)[keyof typeof RoleStatus];

export type option = {
  name: string;
  value: string;
};

export type SummaryType = {
  subTotal: number;
  tax: number;
  total: number;
};

export type orderDetailsType = Order & {
  items: OrderItemType[];
};

export type OrderItemType = OrderItem & {
  product: productType;
};
export type OrderItemClientType = Omit<
  OrderItemType,
  "id" | "createdAt" | "productId" | "orderId"
>;

export { OrderStatus } from "@prisma/client";

import  type { feedBack } from "@prisma/client"
export type feedBackType = feedBack & {customer:{name:string}}

export type MessageType = {
  message: string;
};