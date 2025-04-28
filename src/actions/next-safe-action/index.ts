import { Prisma } from "@prisma/client";
import { createSafeActionClient } from "next-safe-action";
import { ZodError } from "zod";
import { authenticationMiddleware } from "./middleware/auth";

export const DEFAULT_SERVER_ERROR_MESSAGE =
  "Something went wrong. Please try again later.";
export const DEFAULT_DATABASE_ERROR_MESSAGE =
  "Database error. Please try again later.";
export const DEFAULT_VALIDATION_ERROR_MESSAGE =
  "Validation error. Please check your input.";

export const safeAction = createSafeActionClient({
  handleServerError(e) {
    console.error(e);

    if (e instanceof ZodError) {
      return DEFAULT_VALIDATION_ERROR_MESSAGE;
    } else if (
      e instanceof Prisma.PrismaClientInitializationError ||
      e instanceof Prisma.PrismaClientKnownRequestError ||
      e instanceof Prisma.PrismaClientUnknownRequestError ||
      e instanceof Prisma.PrismaClientValidationError
    ) {
      return DEFAULT_DATABASE_ERROR_MESSAGE;
    } else if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authAction = safeAction.use(authenticationMiddleware);
