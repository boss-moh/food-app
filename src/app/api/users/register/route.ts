import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/constants";
import { prisma } from "@/lib";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {data,error,success} = signupSchema.safeParse(body);
    if (!success) {
      return NextResponse.json(
        { errors: error.formErrors.fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, name,phone } = data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser !== null) {
      return NextResponse.json(
        { errors: { email: "Email already exists" } },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        message: "some unhandle error ",
      },
      { status: 500 }
    );
  }
}
