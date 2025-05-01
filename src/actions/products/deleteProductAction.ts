'use server'
import { RoleStatus } from "@prisma/client";
import { authAction } from "../next-safe-action";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";
import { IDSchmea, URL_PATHS } from "@/constants";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

export const deleteProductAction = authAction
  .metadata({name:'delete Product'})
  .use(authorizationMiddleware([RoleStatus.CHEF]))
  .schema(IDSchmea)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    await prisma.product.delete({
      where: {
        id,
      },
    });
    revalidatePath(URL_PATHS.CHEF.PRODUCT.HOME_PAGE);
    return {
      message: `Deleted meal with ID: ${id}`,
    };
  });

export default deleteProductAction;
