import { Inter } from 'next/font/google';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Hero from '@/components/layout/Hero';
import Promo from '@/components/Promo';
import Categories from '@/features/catalog/components/Categories';
import Incentives from '@/components/Incentives';
import 'swiper/css';
import 'swiper/css/pagination';

const inter = Inter({ subsets: ['latin'] });
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ProductSwiper = dynamic(() => import('@/features/catalog/components/ProductSwiper'), {
  loading: () => (
    <div className='mx-auto w-3/4 lg:w-11/12 pb-8 pt-12 relative h-[20rem]'>
      <Skeleton className='h-full w-full  rounded-e-lg' />
    </div>
  ),
  ssr: false,
});

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
