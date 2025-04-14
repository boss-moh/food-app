import { OrderStatus, RoleStatus } from "@prisma/client";

export const ChangeStatusOptions = {
  [RoleStatus.ADMIN]: Object.values(OrderStatus),
  [RoleStatus.CHEF]: [
    OrderStatus.PREPARING,
    OrderStatus.DELIVERED,
    OrderStatus.REJECTED,
  ],
  [RoleStatus.DRIVER]: [OrderStatus.PICKING, OrderStatus.DONE],
};
