import { useSession, signIn, signOut,  } from "next-auth/react"
import React from 'react'

const AuthPage = () => {
  const { data: session } = useSession()
  

  if (session) {
    return (
      <div className="min-h-screen">
        Signed in as {session.user?.email} <br />
        <pre>{JSON.stringify(session, null, '\t')}</pre>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}

export default AuthPage