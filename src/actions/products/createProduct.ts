"use server";

import { RoleStatus } from "@prisma/client";
import { authAction } from "../next-safe-action";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";
import { createProductSchema, createProductType, URL_PATHS } from "@/constants";
import { uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

export const createProductAction = authAction
  .metadata({name:'Create Product'})

  .use(authorizationMiddleware([RoleStatus.CHEF]))
  .schema(createProductSchema)
  .action(async ({ parsedInput }) => {
    const { imageUrl, ...rest } = parsedInput;

    const optimizedUrl = await uploadImage(imageUrl);
    createProduct({ imageUrl: optimizedUrl, ...rest });
    revalidatePath(URL_PATHS.HOME);
    revalidatePath(URL_PATHS.CHEF.PRODUCT.HOME_PAGE);

    return {
      success: true,
      message: "New product created successfully",
    };
  });

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
    throw new Error("Error creating product");
  }
};
