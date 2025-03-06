import { signinType } from "@/constants";
import { prisma } from "@/lib";
import bcrypt from "bcryptjs";
import { CredentialsSignin, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

class CredentialError extends CredentialsSignin {}

export const authConfig: NextAuthConfig = {
  providers: [
    GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: signinType) => {
        console.log("credentials", credentials);
        const { email, password } = credentials;

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser === null) {
          throw new CredentialError("Email Not  exists");
        }

        if (!existingUser.password) {
          throw new CredentialError(
            "InValid Login , The Account Created Via Oauth"
          );
        }

        const hasTheSamePassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!hasTheSamePassword) {
          throw new CredentialError('"InValid Password "');
        }

        return existingUser;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      console.log("token", token);
      return token;
    },
    session: async ({ session }) => {
      console.log("session", session);

      return { ...session, customFiled: "sadsa" };
    },
  },
};
