import { auth } from "@/auth";
import { CreateOrder} from "@/constants";
import { prisma } from "@/lib";
import { getCalcInfo } from "@/utils";
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
        status: 403,
      }
    );

  const { success, data, error } = CreateOrder.safeParse(body);


  if (!success) {
    return NextResponse.json(
      {
        message: "Please Provider All Data",
        errors: error.flatten().formErrors,
      },
      { status: 400 }
    );
  }

  const { orderItems, address } = data;

  try {
    const productList = await Promise.all(
      orderItems.map((item) =>
        prisma.product.findUnique({
          where: {
            id: item.id,
          },
          select: {
            price: true,
          },
        })
      )
    );

    const ordersList = productList.map((item, index) => ({
      product: item!,
      quantity: orderItems[index].quantity,
      productId: orderItems[index].id,
    }));


    const { subTotal, tax, total } = getCalcInfo(ordersList );

    console.log("subTotal, tax, total",{subTotal, tax, total});
    console.log("before carete order",ordersList);


    await prisma.order.create({
      data: {
        customerId: session.user.id,
        items: {
          create: ordersList.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
        subTotal,
        tax,
        total,
        address,
      },
    });
    console.log("before after order");

    return NextResponse.json({
      message: "Order Created Successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Error in Creating Order"
      },
      {
        status: 500,
      }
    );
  }
}

