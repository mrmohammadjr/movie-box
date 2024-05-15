// export { default } from "next-auth/middleware"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const authCookie = cookies().get("auth");
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedRoute && !authCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isProtectedRoute && authCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher : ["/dashboard"]
}