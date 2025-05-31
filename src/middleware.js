import { NextResponse } from 'next/server'


// this middleware is used to simlute protected route on each route request (all pages dashboard and login)
export function middleware(request) {
  // get the token from the cookie
  const isAuthenticated = request.cookies.get('auth_token')

  // if user is not authenticated and trying to access dashboard redirect to login
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
   //if user is authenticated and trying to access login redirect to dashboard
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (isAuthenticated) {
      // Redirect to dashboard if already authenticated
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

// configure the middleware rquest to run on the dashboard pages and login 
export const config = {
  matcher: ['/dashboard/:path*', '/login']
} 