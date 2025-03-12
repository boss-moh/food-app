// import "server-only";
import { productType } from "@/constants";
import prisma from "../prisma";
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
  ["Categories"],
  {
    tags: ["Categories"],
  }
);

// export function fetchCategories() {
//   return ;
// }

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

type options = keyof productType;
type selectedOptions = Extract<
  options,
  "price" | "createdAt" | "rating" | "prepTime"
>;

export async function fetchDishesBaseOn(baseOn: selectedOptions) {
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
