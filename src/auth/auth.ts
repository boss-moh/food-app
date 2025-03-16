import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/lib";
import { URL_PATHS ,RoleStatus} from "@/constants";

import { authConfig } from "./authConfig";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token }) => {
      /** create JWT */
      const userId = token.sub;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const { role } = user!;

      return { ...token, role, userId };
    },
    session: async ({ session, token }) => {
      const { userId, role } = token;

      if (session.user) {
        session.user.id = userId as string;
        session.user.role = role as RoleStatus;
      }

      return session;
    },
  },
  pages: {
    signIn: URL_PATHS.AUTH.SIGN_IN,
  },
  ...authConfig,
});
