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
// import dynamic from 'next/dynamic';
// import { Skeleton } from '@/components/ui/skeleton';
import { GetStaticProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getProductsQuery } from '@/features/catalog/queries';
import { ProductSwiper } from '@/features/catalog';

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

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['products', '1coffee_tea10'],
    getProductsQuery(1, 'coffee_tea', undefined, 10),
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default HomePage;
