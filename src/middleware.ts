import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply auth checks to /admin routes
  if (pathname.startsWith('/admin')) {
    const { supabaseResponse, user } = await updateSession(request);

    const isAuthRoute =
      pathname === '/admin/login' ||
      pathname === '/admin/forgot-password' ||
      pathname === '/admin/reset-password';

    // If user is accessing /admin root, redirect to dashboard or login
    if (pathname === '/admin') {
      const targetUrl = request.nextUrl.clone();
      targetUrl.pathname = user ? '/admin/dashboard' : '/admin/login';
      return NextResponse.redirect(targetUrl);
    }

    // Protect /admin/dashboard and any non-auth /admin routes
    if (!user && !isAuthRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
    }

    // If user is already logged in and tries to access login or forgot-password, redirect to dashboard
    if (user && isAuthRoute && pathname !== '/admin/reset-password') {
      const dashUrl = request.nextUrl.clone();
      dashUrl.pathname = '/admin/dashboard';
      return NextResponse.redirect(dashUrl);
    }

    return supabaseResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths starting with /admin
     */
    '/admin/:path*',
  ],
};
