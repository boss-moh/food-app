import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signinSchema } from "@/constants";
import { prisma } from "@/lib";
import { signIn } from "@/auth";

export async function POST(request: Request) {
  const data = await request.json();

  const errors = signinSchema.safeParse(data);
  if (!errors.success) {
    return NextResponse.json(
      { errors: errors.error.formErrors.fieldErrors },
      { status: 400 }
    );
  }

  const { email, password } = errors.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser === null) {
    return NextResponse.json(
      { errors: { email: "Email Not  exists" } },
      { status: 400 }
    );
  }

  if (!existingUser.password) {
    return NextResponse.json(
      { errors: { account: "InValid Login , The Account Created Via Oauth" } },
      { status: 400 }
    );
  }

  const hasTheSamePassword = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!hasTheSamePassword) {
    return NextResponse.json(
      { errors: { password: "InValid Password " } },
      { status: 400 }
    );
  }

  // Ssfaule

  // const responseUser = {
  //   id: existingUser.id,
  //   email: existingUser.email,
  //   image: existingUser.image,
  //   name: existingUser.name,
  // };
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  try {
    await signIn("credentials", {
      form,
    });
  } catch (e) {
    console.log(e);
  }
  // return NextResponse.json(responseUser);
}
