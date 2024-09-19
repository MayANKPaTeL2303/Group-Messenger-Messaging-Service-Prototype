import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

//Export the default middleware from next/auth
export { default } from 'next-auth/middleware';

// Define the routes that this middleware will apply to
export const config = {
  matcher: ['/:path*', '/login', '/sign-up'],
};

// Middleware function to handle authentication checks
export async function middleware(request) {
  // Get the JWT token from the request
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If the user is authenticated and trying to access the login or sign-up page, redirect to dashboard
  if (token && (url.pathname.startsWith('/login') || url.pathname.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to dashboard instead of home
  }

  // If none of the conditions match, proceed to the requested page
  return NextResponse.next();
}
