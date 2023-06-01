import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { signInWithCredentials } from "./.signInWithCredentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { signInWithOAuth } from "./signInWithOAuth";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds  
    updateAge: 24 * 60 * 60, // 24 hours in seconds
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile) {
        // Return all the profile information you need.
      // The only truly required field is `id`
      // to be able identify the account when added to a database
        const user = signInWithOAuth({...profile, name: profile.name || profile.login})
        return user as any
        //  {
          // id: profile.id.toString(),
          // name: profile.name || profile.login,
          // email: profile.email,
          // image: profile.avatar_url,
        // } 
      },

    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "long@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const user = await signInWithCredentials({...credentials!, name: req.body?.name as string ?? undefined})
        
        console.log(credentials, user)
        // If no error and we have user data, return it
        if (user) {
          return user as any
        } 
        // Return null if user data could not be retrieved
        else return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)