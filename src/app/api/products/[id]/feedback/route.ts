import { auth } from "@/auth";
import { addFeedBackSchmea, addFeedBackType, DynamicProps } from "@/constants";
import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: DynamicProps<"id">) {
  try {
    const productId = (await params).id;
    const body = await req.json();

    const { success, error, data } = addFeedBackSchmea.safeParse(body);

    if (!success ) {
      return NextResponse.json(
        {
          message: "Please provide valid feedback data",
          errors : error?.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          message: "you Should be login",
        },
        { status: 400 }
      );
    }

    const {
      user: { id: customerId },
    } = session;
   
    await createFeedBack({
      customerId,
      productId,
      ...data
    })

    return NextResponse.json(
      {
        message: "Successfully added your feedback",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}


type createFeedBack = addFeedBackType & {
  productId: string;
  customerId: string;
};
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
      const newRating = (rating * rateCount + feedBack.rating) / newRateCount;
   

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
