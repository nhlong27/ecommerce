import React from 'react';
import { Filters, ProductDetails, ProductList } from '@/features/catalog';
import BreadCrumbs from '@/features/catalog/components/BreadCrumbs';
import { useRouter } from 'next/router';
import { Text } from '@/components/common/Text';
import Image from 'next/image';
import helper from '@/constants/helper';
import SearchBar from '@/components/common/SearchBar';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getProductsQuery } from '@/features/catalog/queries';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { GetServerSidePropsContext } from 'next';

const ProductSwiper = dynamic(() => import('@/features/catalog/components/ProductSwiper'), {
  loading: () => (
    <div className='mx-auto w-3/4 lg:w-11/12 pb-8 pt-12 relative h-[20rem]'>
      <Skeleton className='h-full w-full  rounded-e-lg' />
    </div>
  ),
  ssr: false,
});

export const categoryRegistry = {
  coffee_tea: {
    title: 'Coffee / Tea',
    brands: ['Brisk', 'KeVita', 'Lipton', 'Pure Leaf', 'Frappuccino', 'Yachak'],
    sizes: ['1L', '12oz', '16oz'],
  },
  energy_drink: {
    title: 'Energy drink',
    brands: ['Amp Energy', 'Celcisu', 'Citrus Springs', 'Gatorade', 'Mtn Dew', 'Rockstar Energy'],
    sizes: ['12oz', '16oz'],
  },
  juice_shake: {
    title: 'Juice shake',
    brands: ['Naked Juice', 'Tropicana', 'Dole'],
    sizes: ['1L', '2L', '12oz', '14oz'],
  },
  sport_drink: {
    title: 'Sport drink',
    brands: ['Gatorade', 'Propel'],
    sizes: ['12oz', '14oz'],
  },
  water: {
    title: 'Water',
    brands: ['Aquafina', 'Bubly', 'Propel', 'Schweppes'],
    sizes: ['1.5L', '1L', '12oz', '16oz', '500ml'],
  },
};

const CataloguePage = () => {
  const router = useRouter();

  return (
    <div className='w-full min-h-screen flex flex-col relative'>
      {!router.query.slug?.[1] && (
        <>
          <div className='w-full h-[20rem] flex justify-center lg:flex-row flex-col items-center gap-8'>
            <Text variant='3xl/normal/white' className='text-white dark:text-white font-serif'>
              Have a name in mind?
            </Text>
            <SearchBar />
            <Button
              variant='link'
              className='text-white'
              onClick={() => {
                const { keyword, ...rest } = router.query;
                router.push({
                  pathname: router.pathname,
                  query: { ...rest },
                });
              }}
            >
              Reset
            </Button>
          </div>
          <div className='h-[30rem] absolute w-full overflow-hidden -z-10'>
            <Image
              alt='image'
              src={helper.images.commercial14}
              priority
              fill
              sizes={'100vw'}
              className='object-cover brightness-50'
            />
          </div>
        </>
      )}
      <div className='w-11/12 mx-auto min-h-screen p-8 rounded-lg z-10 bg-white dark:bg-stone-950'>
        <Text variant='3xl/semibold/black'>
          {router.query.slug?.[1]
            ? 'Product (SKU): ' + router.query.slug?.[1]
            : 'Catalogue - ' +
              categoryRegistry[router.query.category as keyof typeof categoryRegistry]?.title}
        </Text>
        <BreadCrumbs routerQueries={['catalogue', ...(router.query.slug || [])]} />
        {router.query.slug?.[1] ? (
          <ProductDetails sku={router.query.slug?.[1]} />
        ) : (
          <>
            <Filters />
            <ProductList />
          </>
        )}
      </div>
      {router.query.slug?.[1] ? <ProductSwiper category={router.query.slug?.[0]} /> : null}
    </div>
  );
};

export default CataloguePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { category, page, price, brand, keyword, sortBy }: Record<string, string | undefined> = {
    ...context.query,
    price: (context.query.price as string) ?? '10',
    brand: (context.query.brand as string) ?? undefined,
    keyword: (context.query.keyword as string) ?? undefined,
    sortBy: (context.query.sortBy as string) ?? undefined,
  };
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['products', `${(page as string) + category + brand + price + sortBy + keyword}`],
    getProductsQuery(Number(page), category as string, brand, Number(price), sortBy, keyword)
      .queryFn,
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
