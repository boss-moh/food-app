"use server";

import {
  CACHCES_KEYS,
  createCategorySchema,
  RoleStatus,
  URL_PATHS,
} from "@/constants";
import { authAction } from "../next-safe-action";
import { uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib";
import { revalidatePath, revalidateTag } from "next/cache";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";

export const createCategoryAction = authAction
  .use(authorizationMiddleware([RoleStatus.CHEF]))
  .schema(createCategorySchema)
  .action(async ({ parsedInput }) => {
    try {
      const { imageUrl, name } = parsedInput;

      const fullURL = await uploadImage(imageUrl);

      await prisma.category.create({
        data: {
          name,
          imageUrl: fullURL,
        },
      });
      revalidatePath(URL_PATHS.CHEF.CATEGORIE.HOME_PAGE);
      revalidateTag(CACHCES_KEYS.CATEGORIES);
      return {
        message: "Category Created Successfully",
      };
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong while creating category");
    }
  });
