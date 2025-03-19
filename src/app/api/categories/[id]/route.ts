import { CACHCES_KEYS, DynamicProps } from "@/constants";
import { prisma } from "@/lib";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: DynamicProps<"id">) {
  try {
    const { id } = await params;
    if (!id)
      return NextResponse.json(
        {
          message: "There Is No Id",
        },
        {
          status: 400,
        }
      );

    await prisma.category.delete({
      where: {
        id,
      },
    });

    revalidateTag(CACHCES_KEYS.CATEGORIES);
    return NextResponse.json(
      {
        message: "Category Was Delete",
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        message: "faild to delete",
      },
      {
        status: 500,
      }
    );
  }
}
