"use server";

import { signOut } from "./auth";
import { DEFAULT_REDIRECTED } from "@/constants";

export async function logout() {
  console.log("handle logout on server");
  await signOut({
    redirectTo: DEFAULT_REDIRECTED,
  });
}
