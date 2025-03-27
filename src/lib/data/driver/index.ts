import prisma from "@/lib/prisma";

export async function fetchDriverOrders() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        OR: [{ status: "DELIVERED" }],
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