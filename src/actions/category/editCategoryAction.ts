"use server";

import {
  CACHCES_KEYS,
  editCategorySchema,
  RoleStatus,
  URL_PATHS,
} from "@/constants";
import { authAction } from "../next-safe-action";
import { uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib";
import { revalidatePath, revalidateTag } from "next/cache";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";

export const editCategoryAction = authAction
  .use(authorizationMiddleware([RoleStatus.CHEF]))
  .schema(editCategorySchema)
  .action(async ({ parsedInput }) => {
    try {
      const { imageUrl, name, id } = parsedInput;

      const fullURL = await handleImageUrlChanged(id, imageUrl);

      await prisma.category.create({
        data: {
          name,
          imageUrl: fullURL,
        },
      });
      revalidatePath(URL_PATHS.CHEF.CATEGORIE.HOME_PAGE);
      revalidateTag(CACHCES_KEYS.CATEGORIES);
      return {
        message: "Category updated successfully",
      };
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred while updating the category");
    }
  });

const handleImageUrlChanged = async (id: string, imageUrl: string) => {
  const oldData = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });

  const isSameImage = oldData?.imageUrl === imageUrl;

  if (isSameImage) {
    return imageUrl;
  }

  return await uploadImage(imageUrl);
};
