import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
}


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const token = await getToken({req:request, secret: process.env.NEXTAUTH_SECRET_KEY})
  // console.log("Token is here middlewear" , token);
  const url = request.nextUrl

  if (
    token &&
    (url.pathname.startsWith('/signin') ||
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/verify') )
  ){
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if(!token && (
    url.pathname.startsWith('/dashboard')
  )){
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  
  return NextResponse.next();
}
 