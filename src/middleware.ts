/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Can also move this to a separate utility function to put in getServerSideProps()
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process?.env?.NEXTAUTH_SECRET,
    cookieName: 'next-auth.session-token'
  });
  // redirect user without access to login
  //@ts-ignore
  if (!token || Date.now() / 1000 > token?.expires_at) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  // redirect user without admin access to login
  // if (token.role==='ADMIN') {
  //   return NextResponse.redirect("http://localhost:3000/");
  // }
  return NextResponse.next();
}

export const config = { matcher: [ '/about', '/admin' ] }