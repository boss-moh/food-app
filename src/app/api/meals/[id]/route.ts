import { DynamicProps } from "@/constants";
import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

// TODO:Delete Image From Cloudainry
export async function DELETE(req: NextRequest, { params }: DynamicProps<"id">) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: `Deleted meal with ID: ${id}` });
  } catch {
    return NextResponse.json({ message: "Faild To Delete" }, { status: 401 });
  }
}
