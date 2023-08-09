/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth, { NextAuthOptions, TokenSet } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithCredentials } from './.signInWithCredentials';
import { signInWithOAuth } from './.signInWithOAuth';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import { signJWT, verifyJWT } from '@/utils/jwt';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    updateAge: 24 * 60 * 60, // 24 hours in seconds
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: { params: { access_type: 'offline', prompt: 'consent' } },
      profile(profile) {
        const user = signInWithOAuth(profile);
        return user as any;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        const user = signInWithOAuth({
          ...profile,
          name: profile.name || profile.login,
        })
        return user as any
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
      profile(profile) {
        const user = signInWithOAuth({
          ...profile,
          name: profile.name || profile.login,
        })
        return user as any
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@mail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = signInWithCredentials(
          credentials as {
            email: string;
            password: string;
            name?: string;
          },
        );
        if (user) {
          return user as any;
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        const accessToken = signJWT({ ...user }, { expiresIn: '15m' }); // 15mins
        const refreshToken = signJWT({ ...user }, { expiresIn: '1y' }); //1 year
        account.access_token = accessToken;
        account.refresh_token = refreshToken;
        account.expires_at = Math.floor(Date.now() / 1000 + 15 * 60);
      }
      return true;
    },
    //token for jwt strategy, user for database strategy
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async jwt({ token, account, user }) {

      if (user) {
        token.role = user.role;
        token.emailVerified = user.emailVerified;
      }
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          provider: account.provider,
          access_token: account.access_token,
          //@ts-ignore
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          ...token,
        };
        //@ts-ignore
      } else if (Date.now() < token.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
        try {
          if (token.provider === 'credentials') {
            const { decoded } = verifyJWT(token.refresh_token as string);
            if (!decoded) throw new Error();
            const user = await prisma.user.findFirst({
              where: {
                email: (decoded as any).email,
              },
            });
            if (!user) throw new Error();
            const accessToken = signJWT({ ...user }, { expiresIn: '15m' });
            return {
              ...token, // Keep the previous token properties
              access_token: accessToken,
              //@ts-ignore
              expires_at: Math.floor(Date.now() / 1000 + 15 * 60),
            };
          } else {
            const response = await fetch('https://oauth2.googleapis.com/token', {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              //@ts-ignore
              body: new URLSearchParams({
                client_id: process.env.GOOGLE_ID,
                client_secret: process.env.GOOGLE_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token,
              }),
              method: 'POST',
            });

            const tokens: TokenSet = await response.json();

            if (!response.ok) throw tokens;

            return {
              ...token, // Keep the previous token properties
              access_token: tokens.access_token,
              //@ts-ignore
              expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
              // Fall back to old refresh token, but note that
              // many providers may only allow using a refresh token once.
              refresh_token: tokens.refresh_token ?? token.refresh_token,
            };
          }
        } catch (error) {
          console.error('Error refreshing access token', error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
  },
  // just to be sure, either set a NEXTAUTH_SECRET in .env or secret here
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: '/auth',
  //   signOut: '/',
  //   error: '/auth', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth', // (used for check email message)
  //   newUser: '/auth', // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  // cookies: cookies,
};
export default NextAuth(authOptions);

// const cookies: Partial<CookiesOptions> = {​
//   sessionToken: {​
//       name: `next-auth.session-token`,​
//       options: {​
//           httpOnly: true,​
//           sameSite: "none",​
//           path: "/",​
//           domain: process.env.NEXT_PUBLIC_DOMAIN,​
//           secure: true,​
//       },​
//   },​
//   callbackUrl: {​
//       name: `next-auth.callback-url`,​
//       options: {​
//           ...​
//       },
//   },​
//   csrfToken: {​
//       name: "next-auth.csrf-token",​
//       options: {​
//       ...​
//       },​
//   },​
// };
