import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/constants";
import { prisma } from "@/lib";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const errors = signupSchema.safeParse(data);
    if (!errors.success) {
      return NextResponse.json(
        { errors: errors.error.formErrors.fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, name } = errors.data;

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
        emailVerified: new Date(), // Auto-verify for simplicity
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "some unhandle error ",
      },
      { status: 500 }
    );
  }
}
