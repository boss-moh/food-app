"use server";
import { createOrderSchema, RoleStatus } from "@/constants";
import { authAction } from "../next-safe-action";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";
import { prisma } from "@/lib";
import { getCalcInfo } from "@/utils";

export const createOrderAction = authAction
  .metadata({name:"create order"})

  .use(authorizationMiddleware([RoleStatus.CUSTOMER]))
  .schema(createOrderSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { orderItems, address } = parsedInput;

    const user = ctx.session.user;

    const productList = await Promise.all(
      orderItems.map((item) =>
        prisma.product.findUnique({
          where: {
            id: item.id,
          },
          select: {
            price: true,
          },
        })
      )
    );

    const orderListItems = productList.map((item, index) => ({
      product: item!,
      quantity: orderItems[index].quantity,
      productId: orderItems[index].id,
    }));


    const { subTotal, tax, total } = getCalcInfo(orderListItems);

    await prisma.order.create({
      data: {
        customerId: user.id,
        items: {
          create: orderListItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
        subTotal,
        tax,
        total,
        address,
      },
    });
    return {
      message: "Order Created Successfully",
    };
  });
