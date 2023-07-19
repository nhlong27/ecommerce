import { Inter } from 'next/font/google';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Hero from '@/components/layout/Hero';
import { ProductSwiper } from '@/features/catalog';
import Promo from '@/components/Promo';
import Categories from '@/features/catalog/components/Categories';
import Incentives from '@/components/Incentives';

const inter = Inter({ subsets: ['latin'] });
import { Separator } from "@/components/ui/separator"

function HomePage() {
  const { data: session } = useSession();

  React.useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn();
    }
  }, [session]);

  return (
    <main className={`flex flex-col min-h-screen w-full ${inter.className}`}>
      <Hero />
      <Separator className='mx-auto w-11/12' />
      <Promo />
      <Categories />
      <ProductSwiper />
      <Separator className='mx-auto w-11/12' />
      <Incentives />
    </main>
  );
}
export default HomePage;
