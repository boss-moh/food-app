import { RoleStatus } from "@prisma/client";
import { authAction } from "../next-safe-action";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";
import { z } from "zod";
import { prisma } from "@/lib";

export const deleteAction = authAction
  .use(authorizationMiddleware([RoleStatus.CHEF]))
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return {
      message: `Deleted meal with ID: ${id}`,
    };
  });
