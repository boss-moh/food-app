import { CACHCES_KEYS, createCategorySchema } from "@/constants";
import { fetchCategories, prisma } from "@/lib";
import { uploadImage } from "@/lib/cloudinary";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await fetchCategories();

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

/**
 * accept
 * check
 * add
 * valid
 * return it
 * @returns
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const valid = createCategorySchema.safeParse(body);
    if (!valid.success) {
      return NextResponse.json(
        {
          message: "Please , Send All Data",
          errors: valid.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { imageUrl, name } = valid.data;
    const fullURL = await uploadImage(imageUrl);

    const category = await prisma.category.create({
      data: {
        name,
        imageUrl: fullURL,
      },
    });

    revalidateTag(CACHCES_KEYS.CATEGORIES);
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Create New  category", error },
      { status: 500 }
    );
  }
}
