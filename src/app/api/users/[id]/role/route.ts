import { ChangeRoleSchema, DynamicProps } from "@/constants";
import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

/**
 * search for user by id
 * if user not found return 404
 * update user.role
 * return success
 */

export async function PUT(req: NextRequest, { params }: DynamicProps<"id">) {
  try {
    const body = await req.json();
    const id = (await params).id;

    const { success, data } = ChangeRoleSchema.safeParse(body);
    if (!success) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: data.role,
      },
    });

    return NextResponse.json({ message: "Role Updated" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Some Error Happen in Server" },
      { status: 500 }
    );
  }
}
