import { prisma } from "@/lib";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

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
      authorize: async (credentials) => {
        console.log("credentials", credentials);

        if (!credentials?.email || !credentials?.password) {
          // throw new Error("Please enter email and password");
          console.log("there is no data");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        console.log("user", user);
        if (!user || !user.password) {
          console.log("No user found with the provided email.");
          return null;
          // throw new Error("No user found with the provided email.");
        }
        // logic to salt and hash password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)
        if (!isValid) {
          console.log("is not isValid");
          // throw new Error("Invalid credentials");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
};
