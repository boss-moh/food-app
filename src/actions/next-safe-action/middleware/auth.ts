
import { auth } from "@/auth";
import { RoleType } from "@/constants";
import { Session } from "next-auth";
import { createMiddleware } from "next-safe-action";

export const authenticationMiddleware = createMiddleware().define(
  async ({ next }) => {
    const session = await auth();

    if (session === null) {
      throw new Error("You must be logged in to perform this action");
    }

    return next({
      ctx: {
        session,
      },
    });
  }
);

type input = {
  ctx: {
    session: Session;
  };
};

export const authorizationMiddleware = (whoCanDo: RoleType[]) =>
  createMiddleware<input>().define(async ({ next, ctx }) => {
    const { session } = ctx;

    const userRole = session.user.role;

    const hasAccess = whoCanDo.includes(userRole);
    if (!hasAccess) {
      throw new Error("You don't have permission to perform this action");
    }

    return next({
      ctx: {
        ...ctx,
        user: session.user,
      },
    });
  });


  