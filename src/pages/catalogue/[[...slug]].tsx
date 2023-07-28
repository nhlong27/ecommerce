import React from 'react';
import { Categories, Filters, ProductDetails, ProductList } from '@/features/catalog';
import BreadCrumbs from '@/features/catalog/components/BreadCrumbs';
import Link from 'next/link';
import CategorySection from './[[...slug]]';
import { useRouter } from 'next/router';
import { Text } from '@/components/common/Text';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import helper from '@/constants/helper';
import SearchBar from '@/components/common/SearchBar';

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
