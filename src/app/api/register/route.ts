import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/constants";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();

  const errors = signupSchema.safeParse(data);
  if (!errors.success) {
    return NextResponse.json(
      { errors: errors.error.formErrors.fieldErrors },
      { status: 400 }
    );
  }

  const { email, password, name } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { errors: { email: "Email already exists" } },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      emailVerified: new Date(), // Auto-verify for simplicity
    },
  });

  return NextResponse.json(user);
}
