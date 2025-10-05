import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function authMiddleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development';
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;

  const protectedRoutes = [
    '/profile',
    '/settings'
  ];

  const publicRoutesWhenAuthenticated = [
    '/login',
    '/signup'
  ];

  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  const isPublicRouteWhenAuthenticated = publicRoutesWhenAuthenticated.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isLoggedIn) {
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isPublicRouteWhenAuthenticated && isLoggedIn) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}
