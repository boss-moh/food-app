import { RoleType, signinSchema } from "@/constants";
import { prisma } from "@/lib";
import bcrypt from "bcryptjs";
import { CredentialsSignin, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export class CredentialError extends CredentialsSignin {
  constructor(message: string) {
    super("Faild To Login Via Credential");
    this.message = message;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Google,
    Credentials({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credential) {
        const isValid = signinSchema.safeParse(credential);
        if (!isValid.success) {
          throw new CredentialError("Please Provider All Data");
        }

        const { password, email } = isValid.data;

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser === null) {
          throw new CredentialError("Email Not exists");
        }

        if (!existingUser.password) {
          throw new CredentialError(
            "Invalid Login, The Account Created Via OAuth"
          );
        }

        const hasTheSamePassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!hasTheSamePassword) {
          throw new CredentialError("Invalid Password");
        }

        const { id, name, role } = existingUser;

        return { id, email, name, role };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account) {
        token.provider = account.provider;
      }

      if (user) {
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const { userId, role, provider } = token;

      if (session.user) {
        session.user.id = userId as string;
        session.user.role = role as RoleType;
        session.user.provider = (provider as string) || "credential";
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
};
