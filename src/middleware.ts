import NextAuth from "next-auth";
import { authConfig } from "./auth";
import {
  // ADMIN_PATHS,
  API_PREFIX,
  PROTECTED_PATHS,
  PUBLICE_PATHS,
  URL_PATHS,
} from "./constants";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const path = req.nextUrl.pathname;
  console.log("path", path);

  const isApiRequest = path.startsWith(API_PREFIX);
  if (isApiRequest) return;

  const isPublicPath = PUBLICE_PATHS.includes(path);
  if (isPublicPath) return;

  const isLoggin = !!req.auth;
  const isProtecedPath = PROTECTED_PATHS.includes(path);

  if (isProtecedPath && isLoggin) {
    return;
  }

  const isAdminPath = new RegExp(/admin/gi).test(path);
  const isThemAdmin = req.auth?.user.role === "ADMIN";

  if (isAdminPath && isThemAdmin) {
    return;
  }

  return Response.redirect(new URL(URL_PATHS.NOT_FOUND, req.nextUrl));
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
