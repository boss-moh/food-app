import {
  CACHCES_KEYS,
  OrderStatus,
  RoleType,
  createProductType,
} from "@/constants";
import prisma from "../lib/prisma";
import { unstable_cache as nextCache } from "next/cache";

export const fetchCategories = nextCache(
  async () => {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch {
      throw new Error("Faild to fetch categories");
    }
  },
  [CACHCES_KEYS.CATEGORIES],
  {
    tags: [CACHCES_KEYS.CATEGORIES],
  }
);

export async function fetchCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  } catch {
    throw new Error("Faild to fetch category");
  }
}

export async function fetchProductsById(id: string) {
  try {
    const products = await prisma.product.findMany({
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
export async function fetchProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        feedback: {
          include: {
            customer: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        id,
      },
    });

    return product;
  } catch {
    throw new Error("Faild to fetch product");
  }
}

export type productDetails = Awaited<ReturnType<typeof fetchProductById>>;

export async function fetchMenu() {
  try {
    const products = await prisma.product.findMany({
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
    throw new Error("Faild to fetch Menu");
  }
}

export type mealsType = Awaited<ReturnType<typeof fetchMenu>>;

type selectedOptions = "rating" | "date";

async function fetchDishesBaseOn(baseOn: selectedOptions) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        [baseOn]: "desc",
      },
      take: 4,
    });
    return products;
  } catch {
    throw new Error("Faild to fetch Latest Dishes");
  }
}

export async function fetchMostRatingProducts() {
  return fetchDishesBaseOn("rating");
}
export async function fetchMostNewProducts() {
  return fetchDishesBaseOn("date");
}
export const createProduct = async (foodItem: createProductType) => {
  try {
    await prisma.$transaction(async () => {
      await prisma.product.create({
        data: foodItem,
      });
      const { categoryId } = foodItem;
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      const { count } = category!;
      await prisma.category.update({
        where: { id: categoryId },
        data: {
          count: count + 1,
        },
      });
    });
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export async function fetchOrders(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        customerId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders;
  } catch {
    throw new Error("Faild to fetch orders ");
  }
}
export async function fetchUsers(role: RoleType, query: string) {
  let config = {};
  if (!!role) config = { ...config, role: role.toUpperCase() as RoleType };
  if (!!query) {
    config = {
      ...config,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { id: { contains: query, mode: "insensitive" } },
      ],
    };
  }
  try {
    const users = await prisma.user.findMany({
      where: {
        ...config,
      },
      select: {
        name: true,
        email: true,
        id: true,
        role: true,
      },
    });

    return users;
  } catch {
    throw new Error("Faild to fetch users");
  }
}

export async function fetchOrdersByUserId(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        customerId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders;
  } catch {
    throw new Error("Faild to fetch user's Orders");
  }
}
export async function fetchAdminOrders(query: string, status: OrderStatus) {
  let config = {};
  if (!!status) config = { ...config, status };
  if (!!query) {
    config = {
      ...config,
      OR: [
        {
          id: { contains: query, mode: "insensitive" },
          customerId: { contains: query, mode: "insensitive" },
          customer: {
            name: { contains: query, mode: "insensitive" },
          },
        },
      ],
    };
  }

  console.log("fetchAdminOrders run ");
  try {
    const orders = await prisma.order.findMany({
      where: config,
      include: {
        customer: {
          select: {
            name: true,
            id: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders;
  } catch {
    throw new Error("Faild to fetch Orders");
  }
}

export async function fetchOrdersById(id: string) {
  try {
    const orders = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders;
  } catch {
    throw new Error("Faild to fetch user's Orders");
  }
}

export async function fetchUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        phone: true,
        role: true,
        favoriteItems: true,
        feedback: true,
        id: true,
      },
    });
    return user;
  } catch {
    throw new Error("Faild to fetch user's info");
  }
}

export async function fetchCheckFavtroies(userId: string, productId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        favoriteItems: true,
      },
    });

    const didLikeItBefore = user!.favoriteItems.some(
      (item) => item.id === productId
    );
    return didLikeItBefore;
  } catch {
    throw new Error("Faild to check user's Favorties");
  }
}
