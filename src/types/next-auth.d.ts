import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      emailVerified: string
      image: string
      role: string
    },
    error?: string
  }
  interface User {
    name: string
    email: string
    emailVerified: boolean
    image: string
    role: string
  }
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    token: {
      name: string
      email: string
      emailVerified: string
    }
  }
}
