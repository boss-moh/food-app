"use server";

import { RoleStatus } from "@prisma/client";
import { authAction } from "../next-safe-action";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";
import { editProductSchema, URL_PATHS } from "@/constants";
import { revalidatePath } from "next/cache";

export const editProductAction = authAction
  .use(authorizationMiddleware([RoleStatus.CHEF]))
  .schema(editProductSchema)
  .action(async ({ parsedInput }) => {
    // const { files, ...rest } = parsedInput;
    const { id, ...rest } = parsedInput;

    /**
     * change the file image
     */

    // const optimizedUrl = await uploadImage(files[0]);
    // createProduct({ imageUrl: optimizedUrl, ...rest });
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
