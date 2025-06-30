import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function fetchDriverOrders() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        OR: [{ status: OrderStatus.DELIVERED},{ status: OrderStatus.PICKING}],
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            phone:true
          },
        },
      },
    });

    return orders;
  } catch {
    throw new Error("Faild To Fetch Orders");
  }
}


export type DriversOrder = Awaited<ReturnType<typeof fetchDriverOrders>>[0]