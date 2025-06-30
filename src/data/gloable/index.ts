import { prisma as db } from "@/lib";

export async function fetchProductsByCategoryId(id: string) {
  try {
    const products = await db.product.findMany({
      where: {
        categoryId: id,
      },
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

export async function fetchSearchedProducts(
  query: string | undefined,
  categoryId: string | undefined
) {
  let config = {};
  if (!!categoryId && categoryId?.toLowerCase() !== "all")
    config = { ...config, categoryId };
  if (!!query) {
    config = {
      ...config,
      OR: [
        {
          id: { contains: query, mode: "insensitive" },
        },
        {
          description: { contains: query, mode: "insensitive" },
        },
        {
          name: { contains: query, mode: "insensitive" },
        },
      ],
    };
  }

  try {
    const product = await db.product.findMany({
      where: config,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return product;
  } catch {
    throw new Error("Faild to fetch product");
  }
}
