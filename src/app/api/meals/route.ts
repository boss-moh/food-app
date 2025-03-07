import { fetchMenu, fetchProductsById } from "@/lib";
import { NextResponse } from "next/server";

import { type NextRequest } from "next/server";

// import { prisma } from "@/lib/prisma";
// import { createDishSchema } from "@/constants";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    // Get the URL from the request
    // console.log("categoryId", categoryId);
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

export async function POST() {
  // const body = await req.json();
  return NextResponse.json(
    { success: true, data: { message: "new Product create" } },
    { status: 201 }
  );

  // const errors = createDishSchema.safeParse(body);

  // try {
  //   if (!errors.success) {
  //     return NextResponse.json(
  //       { errors: errors.error.flatten().fieldErrors },
  //       { status: 400 }
  //     );
  //   }

  //   //   type productType = {
  //   //     name: string;
  //   //     id: string;
  //   //     createdAt: Date;
  //   //     updatedAt: Date;
  //   //     description: string;
  //   //     price: number;
  //   //     imageUrl: string | null;
  //   //     categoryId: string;
  //   //     rating: number;
  //   //     prepTime: number;
  //   //     ingredients: string[];
  //   //     nutritionalInfo: string[];
  //   // }

  //   // Your logic (e.g., saving to DB)
  //   const product = await prisma.product.create({
  //     data: errors.data,
  //   });

  //   return NextResponse.json(
  //     { success: true, data: { message: "new Product create", data: product } },
  //     { status: 201 }
  //   );
  // } catch (error) {
  //   console.error("API Error:", error);
  //   return NextResponse.json(
  //     { message: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }
}
