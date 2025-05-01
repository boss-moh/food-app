"use server";
import { product, RoleStatus } from "@prisma/client";
import { authAction } from "../next-safe-action";
import { authorizationMiddleware } from "../next-safe-action/middleware/auth";
import { addFeedBackSchmea, addFeedBackType, URL_PATHS } from "@/constants";
import { prisma } from "@/lib";
import { z } from "zod";
import { revalidatePath } from "next/cache";

type createFeedBack = addFeedBackType & {
  productId: string;
  customerId: string;
};

export const feedAction = authAction
  .metadata({ name: "create feed" })

  .use(authorizationMiddleware([RoleStatus.CUSTOMER]))
  .schema(addFeedBackSchmea.extend({ productId: z.string() }))
  .action(async ({ parsedInput, ctx, metadata }) => {
    console.log("Metadata received:", metadata); // Log metadata for debugging
    const currentUser = ctx.session.user;
    const { productId } = parsedInput;

    await createFeedBack({
      customerId: currentUser.id,
      ...parsedInput,
    });

    const product = (await prisma.product.findUnique({
      where: {
        id: productId,
      },
    })) as product;
    revalidatePath(URL_PATHS.MENU.GET_PRODUCT(product.categoryId, product.id));

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
