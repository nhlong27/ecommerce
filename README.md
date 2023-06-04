## Eslint
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react/display-name": "off",
    "import/no-anonymous-default-export": "off",
  }
}

## Middle ware
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Can also move this to a separate utility function to put in getServerSideProps()
export async function middleware(request: NextRequest) {
  const session = await getServerSession();
  if (!session){
    return NextResponse.redirect(`${process?.env?.NEXT_PUBLIC_SERVER}`);
  }
  console.log('no redirect')
  const token = await getToken({
    req: request,
    secret: process?.env?.NEXTAUTH_SECRET,
    cookieName: 'next-auth.session-token'
  });
  // if (!token){
  //   return NextResponse.redirect(`${process?.env?.NEXT_PUBLIC_SERVER}`);
  // }
  //@ts-ignore
  if (Date.now() / 1000 > token?.expires_at) {
    // renew access_token by calling jwt callback
    await getServerSession();
  }
  // redirect user without admin access to login
  // if (token.role==='ADMIN') {
  //   return NextResponse.redirect("http://localhost:3000/");
  // }
  return NextResponse.next();
}

export const config = { matcher: [ '/admin', '/user' ] }