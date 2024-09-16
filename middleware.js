import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Export the default NextAuth middleware
export { default } from 'next-auth/middleware';

// Define the routes that this middleware will apply to
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/sign-up', '/', '/verify/:path*'],
};

// Middleware function to handle authentication checks
export async function middleware(request) {
  // Get the JWT token from the request
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Check if the user is authenticated
  // Redirect to dashboard if authenticated and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/login') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If not authenticated and trying to access the dashboard, redirect to sign-in
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If none of the conditions match, proceed to the requested page
  return NextResponse.next();
}
