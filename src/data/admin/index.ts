import prisma from "@/lib/prisma";
export async function fetchOrdersCount() {
  try {
    const count = await prisma.order.count();
    return count;
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

export async function fetchProducts(
  query: string = "",
  categoryId: string = ""
) {
  let config = {};
  if (!!categoryId.trim()) config = { ...config, categoryId };
  if (!!query.trim()) {
    config = {
      ...config,
      OR: [
        { id: { contains: query, mode: "insensitive" } },
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    };
  }

  try {
    const products = await prisma.product.findMany({
      where: config,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return products;
  } catch {
    throw new Error("Faild to fetch products");
  }
}

export async function fetchSales() {
  try {
    const result = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });
    return result._sum.total || 0;
  } catch {
    throw new Error("Faild To Fetch Sales total");
  }
}

export async function fetchNotDoneOrderCount() {
  try {
    const orders = await prisma.order.count({
      where: {
        OR: [
          { status: { equals: "PENDING" } },
          { status: { equals: "PREPARING" } },
          { status: { equals: "DELIVERED" } },
        ],
      },
    });
    return orders;
  } catch {
    throw new Error("Faild To Fetch Orders Count");
  }
}
