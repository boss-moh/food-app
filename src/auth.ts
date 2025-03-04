import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { prisma } from "./lib";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import Credentials from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("credentials", credentials);
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email: email as string,
            password: password as string,
          },
        });

        console.log("user", user);

        if (!user) {
          return null;
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
});
