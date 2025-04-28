"use server";
import { RoleStatus } from "@prisma/client";
import { authAction } from "../next-safe-action";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";
import { toggleSchema, URL_PATHS } from "@/constants";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

export const toggleAvaliableAction = authAction
  .use(authorizationMiddleware([RoleStatus.CHEF]))
  .schema(toggleSchema)
  .action(async ({ parsedInput }) => {
    const { id, isAvailable } = parsedInput;

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        isAvailable,
      },
    });


    revalidatePath(URL_PATHS.CHEF.PRODUCT.HOME_PAGE)
    return {
      message: `Successfully ${
        isAvailable ? "enabled" : "disabled"
      } availability for meal with ID: ${id}`,
    };
  });
