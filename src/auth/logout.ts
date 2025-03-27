"use server";

import { signOut } from "./auth";
import { URL_PATHS } from "@/constants";

export async function logout() {
  await signOut({
    redirectTo: URL_PATHS.AUTH.SIGN_IN,
  });
}
