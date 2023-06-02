import { useSession } from 'next-auth/react'
import React from 'react'

const AdminPage = () => {
  const { data: session } = useSession()
  if (session?.user?.role === 'ADMIN') return <div>Admin</div>

  return <div>Youre not admin</div>
}

export default AdminPage
