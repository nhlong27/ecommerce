import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Header from '@/components/Header';
const inter = Inter({ subsets: ['latin'] });

function HomePage() {
  const { data: session } = useSession();
  React.useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn();
    }
  }, [session]);

  return (
    <main
      className={`flex min-h-screen flex-col bg-white items-center ${inter.className} text-black`}
    >
      hi
      {/* <Link className='underline' href='/auth'>
        {'Sign In'}
      </Link>
      <Link className='underline' href='/user'>
        {'To user'}
      </Link>
      <Link className='underline' href='/admin'>
        {'To admin'}
      </Link>
      <Link className='underline' href='/book'>
        {'To book'}
      </Link> */}
    </main>
  );
}
export default HomePage;

