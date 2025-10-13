import { NextRequest } from "next/server";
import { auth } from "./auth";

export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
})
export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
