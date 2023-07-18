import { Inter } from 'next/font/google';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Hero from '@/components/Hero';
import { HomeCategories, ProductSwiper } from '@/features/catalog';
import helper from '@/constants/helper';
import Image from 'next/image';
import { Text } from '@/components/common/text';
import Home from '@/components/Test';
import Benefits from '@/components/Benefits';

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
      <HomeCategories />
      <div className='w-full h-[30rem]'>
        <Home />
      </div>
      <ProductSwiper />
      <div className='mb-8 mt-auto w-full aspect-[3/1] relative flex justify-center items-center overflow-hidden'>
        <Image
          src={helper.images.hero}
          alt={'hero'}
          className='brightness-150 opacity-30 object-cover'
          fill
        />
        <div className='absolute tracking-widest font-serif'>
          <Text variant='XL/bold/black' className='text-center'>
            Quench your thirst
          </Text>
          <Text variant='medium/bold/black' className='text-center'>
            Recommend us to a friend
          </Text>
          <Text variant='medium/bold/black' className='text-center'>
            button
          </Text>
        </div>
      </div>
      <Benefits />
    </main>
  );
}
export default HomePage;
