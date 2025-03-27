"use server";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECTED } from "@/constants";

export default async function loginViaGoogle() {
  await signIn("google", {
    redirectTo: DEFAULT_REDIRECTED,
  });
}
