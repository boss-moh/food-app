import { RoleStatus } from "@prisma/client"
import { DefaultSession } from "next-auth"


export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types"

declare module "next-auth" {
  interface User {
    role:RoleStatus
    id:string
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
      role:RoleStatus
      id:string
    } & DefaultSession["user"]
  }
}

