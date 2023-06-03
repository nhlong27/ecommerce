import { useSession, signIn, signOut,  } from "next-auth/react"
import React from 'react'

const AuthPage = () => {
  const { data: session } = useSession()
  

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <pre>{JSON.stringify(session, null, '\t')}</pre>
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