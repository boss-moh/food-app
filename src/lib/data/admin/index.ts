import prisma from "@/lib/prisma";

export async function fetchOrdersCount() {
  try {
    const count = await prisma.order.count();
    return count;
  } catch {
    throw new Error("Faild To Fetch Orders Count");
  }
}

export async function fetchRecentOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    return orders;
  } catch {
    throw new Error("Faild To Fetch Orders Count");
  }
}

export async function fetchUsersCount() {
  try {
    const count = await prisma.user.count();
    return count;
  } catch {
    throw new Error("Faild To Fetch Usrs Count");
  }
}
