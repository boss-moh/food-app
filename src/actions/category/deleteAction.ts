"use server";
import { IDSchmea, RoleStatus } from "@/constants";
import { authAction } from "../next-safe-action";
import { prisma } from "@/lib";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";

export const deleteCategoryAction = authAction
  .use(authorizationMiddleware([RoleStatus.CHEF]))
  .schema(IDSchmea)
  .action(async ({ parsedInput }) => {
    try {
      const { id } = parsedInput;

      await prisma.category.delete({
        where: {
          id,
        },
      });

      return {
        message: "Category deleted successfully",
      };
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred while deleting the category");
    }
  });
