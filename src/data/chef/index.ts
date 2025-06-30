import prisma from "@/lib/prisma";

export async function fetchChefOrders() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        OR: [{ status: "PENDING" }, { status: "PREPARING" }],
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
          },
        },
      },
    });

    return orders;
  } catch {
    throw new Error("Faild To Fetch Orders");
  }
}
