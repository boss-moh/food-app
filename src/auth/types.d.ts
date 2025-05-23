import { RoleType } from "@/constants";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: RoleType;
    id: string;
    provider?: string;
  }

  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
      role: RoleType;
      id: string;
      provider?: string;
    } & DefaultSession["user"];
  }
}
