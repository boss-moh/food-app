"use server";

import { z } from "zod";
import { authAction } from "../next-safe-action";
import { RoleStatus } from "@prisma/client";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";
import { prisma } from "@/lib";

export const toggleItemFavorties = authAction

  .use(authorizationMiddleware([RoleStatus.CUSTOMER]))
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const { id: productId } = parsedInput;
    const currentUser = ctx.session.user;

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      include: {
        favoriteItems: true,
      },
    });

    const didLikeItBefore = user?.favoriteItems.some(
      (item) => item.id === productId
    );

    if (didLikeItBefore) {
      await remove(currentUser.id, productId);
      return {
        message: "The Product was Deleted from  to user's favorties",
        isInsideFavorties: false,
      };
    }

    await add(currentUser.id, productId);
    return {
      message: "The Product has added to user's favorties",
      isInsideFavorties: true,
    };
  });

const remove = async (userId: string, productId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      favoriteItems: {
        disconnect: { id: productId },
      },
    },
  });
};

const add = async (userId: string, productId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      favoriteItems: {
        connect: { id: productId },
      },
    },
  });
};
