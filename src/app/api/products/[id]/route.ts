import { DynamicProps } from "@/constants";
import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// TODO:Delete Image From Cloudainry
export async function DELETE(req: NextRequest, { params }: DynamicProps<"id">) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "Faild To Delete,You Should Give The ID" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: `Deleted meal with ID: ${id}` });
  } catch {
    return NextResponse.json({ message: "Faild To Delete" }, { status: 400 });
  }
}

const schema = z.object({ available: z.boolean() });

export async function PUT(req: NextRequest, { params }: DynamicProps<"id">) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "Faild To Delete,You Should Give The ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { success, data, error } = schema.safeParse(body);

    if (!success) {
      return NextResponse.json(
        {
          message: "You Should Give The new Status",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        isAvailable: data.available,
      },
    });

    return NextResponse.json({
      message: `Change The is Available  meal with ID: ${id}`,
    });
  } catch {
    return NextResponse.json(
      { message: "Faild To Change The is Available" },
      { status: 400 }
    );
  }
}
