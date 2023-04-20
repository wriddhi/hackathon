import { NextResponse, NextRequest } from "next/server"

export default async function middleware(request: NextRequest) {
  
  const authToken = request.cookies.get(process.env.AUTH_TOKEN!)?.value
  
  if(request.url.includes('/dashboard') && !authToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin).toString())
  }

  if((request.url.includes('/login') || request.url.includes('/register')) && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin).toString())
  }

  return NextResponse.next()
}