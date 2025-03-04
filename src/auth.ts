import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { prisma } from "./lib";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: "jwt" },

  providers: [
    GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        console.log("user", user);
        if (!user || !user.password) {
          return null;
          // throw new Error("No user found with the provided email.");
        }
        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)

        console.log("credentials", credentials);

        // return user object with their profile data
        return user;
      },
    }),
  ],
  // In your NextAuth config
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     return url.startsWith(baseUrl) ? url : baseUrl;
  //   },
  //   async jwt({ token, user }) {
  //     if (user) token.error = undefined;
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.error = token.error;
  //     return session;
  //   }
  // }
});

/**
 *  Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = {
          name: "empty uesr",
        };

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)

        console.log("credentials", credentials);
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
      },
    }),
 */
