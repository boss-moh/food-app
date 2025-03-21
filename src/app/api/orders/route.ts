import { auth } from "@/auth";
import { CreateOrder } from "@/constants";
import { prisma } from "@/lib";
import { NextResponse } from "next/server";
/**
 * accept,
 * check,
 * make OrderAssignmentsPage
 * return
 */
export async function POST(req: Request) {
  const session = await auth();
  const body = await req.json();

  if (!session)
    return NextResponse.json(
      {
        message: "You Should Be Login First",
      },
      {
        status: 400,
      }
    );

  const { success, data, error } = CreateOrder.safeParse(body);

  if (!success) {
    return NextResponse.json({
      message: "Please Provider All Data",
      error: error.formErrors.fieldErrors,
    });
  }

  try {
    await prisma.order.create({
      data: {
        customerId: session.user.id,
        items: {
          create: data.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json({
      message: "Order Created Successfully",
    });
  } catch {
    return NextResponse.json(
      {
        message: "Error in Creating Order",
      },
      {
        status: 500,
      }
    );
  }
}
