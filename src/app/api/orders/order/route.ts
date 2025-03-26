import { ChangOrderStatusSchema } from "@/constants";
import { prisma } from "@/lib";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * change the order status
 * check order and id
 * the id is exist
 *
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { success, data, error } = ChangOrderStatusSchema.safeParse(body);

    if (!success) {
      return NextResponse.json(
        {
          message: "You Should Provide All Data",
          errors: error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const { id, status } = data;

    const order = await prisma.order.findUnique({ where: { id } });

    if (!order) {
      return NextResponse.json(
        { message: "The Order Doesn't exist" },
        {
          status: 400,
        }
      );
    }

    await prisma.order.update({
      where: { id },
      data: {
        status: status as OrderStatus,
      },
    });

    return NextResponse.json(
      { message: "Sucess" },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Some Error Happen" },
      {
        status: 500,
      }
    );
  }
}
