import { useSession } from 'next-auth/react';
import React from 'react';

const AccountPage = () => {
  const { data: session } = useSession();
  return session ? <pre>{JSON.stringify(session.user, null, '\t')}</pre> : <div>Not logged in</div>;
};

export default AccountPage;
