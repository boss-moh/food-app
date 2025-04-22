"use server";
import { RoleStatus } from "@prisma/client";
import { authAction } from "../next-safe-action";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";
import { addFeedBackSchmea, addFeedBackType } from "@/constants";
import { prisma } from "@/lib";
import { z } from "zod";

type createFeedBack = addFeedBackType & {
  productId: string;
  customerId: string;
};

export const feedAction = authAction
  .use(authorizationMiddleware([RoleStatus.CUSTOMER]))
  .schema(addFeedBackSchmea.extend({ productId: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const currentUser = ctx.session.user;

    await createFeedBack({
      customerId: currentUser.id,
      ...parsedInput,
    });

    return {
      message: "Successfully added your feedback",
    };
  });

const createFeedBack = async (feedBack: createFeedBack) => {
  await prisma.$transaction(async () => {
    await prisma.feedBack.create({
      data: feedBack,
    });

    const product = await prisma.product.findUnique({
      where: {
        id: feedBack.productId,
      },
    });

    /** new rating calculation */
    const { rating, rateCount } = product!;
    const newRateCount = rateCount + 1;
    const newRating = parseFloat(
      ((rating * rateCount + feedBack.rating) / newRateCount).toFixed(2)
    );

    await prisma.product.update({
      where: {
        id: feedBack.productId,
      },
      data: {
        rateCount: newRateCount,
        rating: newRating,
      },
    });
  });
};
