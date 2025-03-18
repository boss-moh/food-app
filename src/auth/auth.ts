import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/lib";
import { URL_PATHS } from "@/constants";

import { authConfig } from "./authConfig";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: "jwt" },

  pages: {
    signIn: URL_PATHS.AUTH.SIGN_IN,
  },
  ...authConfig,
});
