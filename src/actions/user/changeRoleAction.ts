"use server";
import { changeRoleSchema } from "@/constants";
import { authAction } from "../next-safe-action";
import { prisma } from "@/lib";

export const changeRoleAction = authAction
  .schema(changeRoleSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { id, role } = parsedInput;

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          role,
        },
      });
      return {
        message: `User role changed to ${role}`,
      };
    } catch (e) {
      console.log(e);
      return {
        message: "Error changing user role",
      };
    }
  });
