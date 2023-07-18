import { Inter } from 'next/font/google';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Hero from '@/components/layout/Hero';
import { ProductSwiper } from '@/features/catalog';
import helper from '@/constants/helper';
import Image from 'next/image';
import { Text } from '@/components/common/Text';
import Promo from '@/components/Promo';
import Categories from '@/features/catalog/components/Categories';
import Incentives from '@/components/Incentives';

const inter = Inter({ subsets: ['latin'] });

function HomePage() {
  const { data: session } = useSession();

  React.useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn();
    }
  }, [session]);

  return (
    <main className={`flex flex-col min-h-dynamic-screen w-full ${inter.className}`}>
      <Hero />
      <span className='mx-auto w-11/12 border-b-[1px] border-primary/30 dark:border-white'></span>
      <Promo />
      <span className='mx-auto w-11/12 border-b-[1px] border-primary/30 dark:border-white'></span>
      <Categories />
      <ProductSwiper />
      <span className='mx-auto w-11/12 border-b-[1px] border-primary/30 dark:border-white'></span>
      <Incentives />
    </main>
  );
}
export default HomePage;
