import NextAuth from "next-auth";
import { authConfig } from "./auth";
import {
  API_PREFIX,
  isAdminPath,
  isChefPath,
  isDriverPath,
  isProtectedPath,
  PUBLICE_PATHS,
  URL_PATHS,
} from "./constants";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const path = req.nextUrl.pathname;
  console.log("path", path);
  const isApiRequest = path.startsWith(API_PREFIX);
  if (isApiRequest) return;

  const isPublicPath = PUBLICE_PATHS.some((item) => item.startsWith(path));
  if (isPublicPath) return;

  const isThemLoggin = !!req.auth;

  if (isProtectedPath(path)) {
    if (isThemLoggin) {
      return;
    }
    return NextResponse.redirect(new URL(URL_PATHS.UN_AUTHORIZED, req.url));
  }

  const userRole = req.auth?.user.role;

  const isThemAdmin = userRole === "ADMIN";
  if (isThemAdmin) {
    return;
  }
  if (isAdminPath(path)) {
    return NextResponse.redirect(new URL(URL_PATHS.UN_AUTHORIZED, req.url));
  }

  const isThemChef = userRole === "CHEF";

  if (isChefPath(path)) {
    if (isThemChef) {
      return;
    }
    return NextResponse.redirect(new URL(URL_PATHS.UN_AUTHORIZED, req.url));
  }

  const isThemDriver = userRole === "DRIVER";

  if (isDriverPath(path)) {
    if (isThemDriver) {
      return;
    }
    return NextResponse.redirect(new URL(URL_PATHS.UN_AUTHORIZED, req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
