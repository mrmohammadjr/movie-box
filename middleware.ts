import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = [
    '/profile',
    '/settings',
  ];

  const publicRoutesWhenAuthenticated = [
    '/login',
    '/signup',
  ];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isPublicRouteWhenAuthenticated = publicRoutesWhenAuthenticated.some((route) => pathname.startsWith(route));

  const token =
    req.cookies.get('__Secure-authjs.session-token')?.value ||
    req.cookies.get('authjs.session-token')?.value;

  const isLoggedIn = Boolean(token);

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isPublicRouteWhenAuthenticated && isLoggedIn) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
