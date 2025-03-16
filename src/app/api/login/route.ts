import { NextResponse } from "next/server";
import { DEFAULT_REDIRECTED, signinSchema } from "@/constants";
import { CredentialError, signIn } from "@/auth";

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

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECTED,
    });
  } catch (e) {
    if (e instanceof CredentialError) {
      switch (e.type) {
        case "CredentialsSignin": {
          console.log(JSON.stringify(e))
          return NextResponse.json(
            { errors: { error: e.code } },
            { status: 400 }
          );
        }

        default: {
          return NextResponse.json(
            { errors: { error: "Internal server error" } },
            { status: 500 }
          );
        }
      }
    }

    throw e;
  }
    return NextResponse.json(
    { message: 'success to login' },
    { status: 200 }
  );;
}
