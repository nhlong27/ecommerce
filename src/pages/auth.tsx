import { useSession, signIn, signOut,  } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
import React from 'react'

const AuthPage = () => {
  const { data: session } = useSession()
  

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default AuthPage