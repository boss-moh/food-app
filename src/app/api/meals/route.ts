import { createDishSchema } from "@/constants";
import { fetchMenu, fetchProductsById, prisma } from "@/lib";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    if (categoryId) {
      const mealsByCategory = await fetchProductsById(categoryId);
      return NextResponse.json(mealsByCategory, { status: 200 });
    }
    const meals = await fetchMenu();
    return NextResponse.json(meals, { status: 200 });
  } catch (error) {
    console.error("Error fetching meals:", error);
    return NextResponse.json(
      { error: "Failed to fetch meals" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { success, data, error } = createDishSchema.safeParse(body);

  if (!success) {
    return NextResponse.json(
      {
        success: false,
        data: { message: "Invalid data", errors: error.formErrors.fieldErrors },
      },
      { status: 400 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _unused, imageUrl, ...rest } = data;

  //upload image

  const optimizedUrl = await uploadImage(imageUrl);

  // create product
  const product = await prisma.product.create({
    data: { imageUrl: optimizedUrl, ...rest },
  });

  revalidatePath("/");

  return NextResponse.json(
    { success: true, data: { message: "new Product create", data: product } },
    { status: 201 }
  );
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const { success, data, error } = createDishSchema.safeParse(body);

  if (!success) {
    return NextResponse.json(
      {
        success: false,
        data: { message: "Invalid data", errors: error.formErrors.fieldErrors },
      },
      { status: 400 }
    );
  }

  // Update Product
  const oldProductData = await prisma.product.findUnique({
    where: { id: data.id! },
  });
  //upload image

  let optimizedUrl = oldProductData?.imageUrl;
  if (oldProductData?.imageUrl !== data.imageUrl) {
    const imageUrl = data.imageUrl;
    optimizedUrl = await uploadImage(imageUrl);
  }

  const product = await prisma.product.update({
    where: {
      id: data.id!,
    },
    data: {
      ...data,
      imageUrl: optimizedUrl,
      id: data.id!,
    },
  });

  revalidatePath("/");

  return NextResponse.json(
    { success: true, data: { message: "new Product create", data: product } },
    { status: 201 }
  );
}
