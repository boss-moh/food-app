import NextAuth from "next-auth";
import { authConfig } from "./auth";
import {
  IGNORET_PATHS,
  isPublicPath as checkIsPublicPath,
  URL_PATHS,
  RoleStatus,
} from "./constants";
import { NextResponse } from "next/server";
import {
  getURLRedirectBaseOnRole,
  isPathForOtherRole,
  isPathForThisRole,
} from "./utils/getRedirectURL";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const path = req.nextUrl.pathname;
  console.log("path", path);

  const isIGNORETPath = IGNORET_PATHS.some((item) => path.startsWith(item));

  if (isIGNORETPath) return;

  const isPublicPath = checkIsPublicPath(path);

  const isThemLoggin = !!req.auth;

  if (!isThemLoggin && isPublicPath) return;
  if (!isThemLoggin && !isPublicPath) {
    // check the url is exits
    return NextResponse.redirect(new URL(URL_PATHS.UN_AUTHORIZED, req.url));
  }

  const userRole = req.auth?.user.role;

  console.log("userRole", userRole);

  // customer should able to visit public page
  if (isPublicPath && userRole !== RoleStatus.CUSTOMER) {
    return NextResponse.redirect(
      new URL(getURLRedirectBaseOnRole(userRole!), req.url)
    );
  }
  if (isPathForThisRole(userRole!, path)) {
    return;
  }

  // if false may there are no path or not
  // check there are path for other actores

  if (isPathForOtherRole(userRole!, path)) {
    return NextResponse.redirect(new URL(URL_PATHS.UN_AUTHORIZED, req.url));
  }

  return NextResponse.redirect(new URL(URL_PATHS.NOT_FOUND, req.url));
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
