// export { auth as middleware } from "./auth";
// // middleware.ts
import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// // import prisma from "./lib/prisma";

export async function middleware() {
  //   // Use prisma if needed
  //   // const user = await prisma.user.findMany();
  //   // console.log("users", user);
  return NextResponse.next();
}
