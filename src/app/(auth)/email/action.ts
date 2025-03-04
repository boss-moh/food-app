"use server";

import { signIn } from "@/auth";

export const credentialsAction = async (formData: FormData) => {
  signIn("credentials", formData);
};

export async function emailSigin(formData: FormData) {
  "use server";
  await signIn("credentials", formData);
}
