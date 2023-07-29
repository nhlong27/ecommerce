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
import { atom } from 'jotai';
import { ProductType } from '@/features/catalog/types';


export const categoryFilterAtom = atom<Set<string>>(
  new Set(['coffee_tea', 'energy_drink', 'juice_shake', 'sport_drink', 'water']),
);
export const brandFilterAtom = atom<Set<any>>(
  new Set(),
);
export const sortAtom = atom<string>(''
);
export const brandsAtom = atom<Array<string>>([]
);
export const priceRangeAtom = atom<number[]>([5]
);


export const filteredProductsAtom = atom<ProductType[] | null>(null);


export const categoryRegistry = {
  coffee_tea: {
    title: 'Coffee / Tea',
    brands: ['Brisk', 'KeVita', 'Lipton', 'Pure Leaf', 'Frappuccino', 'Yachak'],
    sizes: ['1L', '12oz', '16oz']
  },
  energy_drink:{
    title: 'Energy drink',
    brands: ['Amp Energy', 'Celcisu', 'Citrus Springs', 'Gatorade', 'Mtn Dew', 'Rockstar Energy'],
    sizes: ['12oz', '16oz']
  },
  juice_shake: {
    title: 'Juice shake',
    brands: ['Naked Juice', 'Tropicana', 'Dole'],
    sizes: ['1L', '2L', '12oz', '14oz'],
  },
  sport_drink: {
    title: 'Sport drink',
    brands: ['Gatorade', 'Propel'],
    sizes: ['12oz', '14oz'] 
  },
  water: {
    title: 'Water',
    brands: ['Aquafina', 'Bubly', 'Propel', 'Schweppes'],
    sizes: ['1.5L', '1L', '12oz', '16oz', '500ml']
  }
};


const CataloguePage = () => {
  const router = useRouter();

  return (
    <div className='w-full min-h-screen flex flex-col relative'>
      {!router.query.slug?.[1] && (
        <>
          <div className='w-full h-[20rem] flex justify-center lg:flex-row flex-col items-center gap-8'>
            <Text variant='3xl/normal/white' className='text-white dark:text-white font-serif'>Have a name in mind?</Text>
            <SearchBar />
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
            ? router.query.slug?.[1]
            : router.query.slug?.[0]
            ? router.query.slug?.[0]
            : 'Catalogue'}
        </Text>
        <BreadCrumbs routerQueries={['catalogue', ...(router.query.slug || [])]} />
        {router.query.slug?.[1] ? (
          <ProductDetails />
        ) : (
          <>
            <Filters />
            <ProductList />
          </>
        )}
      </div>
    </div>
  );
};

export default CataloguePage;


export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['products'], getProductsQuery().queryFn)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}