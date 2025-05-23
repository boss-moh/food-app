"use server";

import { RoleStatus } from "@prisma/client";
import { authAction } from "../next-safe-action";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";
import { editProductSchema, URL_PATHS } from "@/constants";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib";
import { uploadImage } from "@/lib/cloudinary";

export const editProductAction = authAction
  .metadata({name:'edit Product'})

  .use(authorizationMiddleware([RoleStatus.CHEF]))
  .schema(editProductSchema)
  .action(async ({ parsedInput }) => {
    const { id, imageUrl, ...rest } = parsedInput;

    const optimizedUrl = await handleImageUrlChanged(id, imageUrl);

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...rest,
        imageUrl: optimizedUrl,
      },
    });

    revalidatePath(URL_PATHS.HOME);
    revalidatePath(URL_PATHS.CHEF.PRODUCT.HOME_PAGE);

    return {
      success: true,
      message: "Product updated successfully",
    };
  });

const handleImageUrlChanged = async (id: string, imageUrl: string) => {
  const oldProductData = await prisma.product.findUnique({
    where: { id: id },
  });

  const isSameImage = oldProductData?.imageUrl === imageUrl;

  if (isSameImage) {
    return imageUrl;
  }

  return await uploadImage(imageUrl);
};
