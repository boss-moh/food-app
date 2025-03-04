"use server";
import { signIn } from "@/auth";

export async function name() {
  await signIn("github");
}
export async function SiginAuth() {
  const form = new FormData();

  form.set("email", "test@test.com");
  form.set("password", "123");
  await signIn("credentials", form);
  // await signIn("credentials",{
  //   redirect: false, // Prevents automatic redirection
  //   e
  // });
}
