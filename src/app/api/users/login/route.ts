import { NextResponse } from "next/server";
import { signinSchema } from "@/constants";
import { CredentialError, signIn } from "@/auth";

export async function POST(request: Request) {
  const data = await request.json();

  const errors = signinSchema.safeParse(data);

  if (!errors.success) {
    return NextResponse.json(
      { errors: errors.error?.flatten().formErrors },
      { status: 400 }
    );
  }

  const { email, password } = errors.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return NextResponse.json({ errors: [result.error] }, { status: 400 });
    }

    return NextResponse.json({ message: "success to login" }, { status: 200 });
  } catch (e) {
    if (e instanceof CredentialError) {
      switch (e.type) {
        case "CredentialsSignin": {
          console.log(JSON.stringify(e));
          return NextResponse.json({ errors: [e.code] }, { status: 400 });
        }

        default: {
          return NextResponse.json(
            { errors: ["Internal server error"] },
            { status: 500 }
          );
        }
      }
    }
  }
}
