import { createDishSchema } from "@/constants";
import { fetchMenu, fetchProductsById, prisma } from "@/lib";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { type NextRequest } from "next/server";

// import { prisma } from "@/lib/prisma";
// import { createDishSchema } from "@/constants";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    // Get the URL from the request
    console.log("categoryId", categoryId);
    if (categoryId) {
      const mealsByCategory = await fetchProductsById(categoryId);

      return NextResponse.json(mealsByCategory, { status: 200 });
    }
    // Pass the parameter to fetchMenu
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

  //upload image

  const { imageUrl, ...rest } = data;
  // const t = delete data.imageUrl

  const { secure_url } = await uploadImage(imageUrl);
  const optimizedUrl = secure_url.replace("/upload/", "/upload/f_auto,q_auto/");

  // const fullUrl
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
