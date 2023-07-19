import helper from '@/constants/helper';
import Image from 'next/image';
import React from 'react';
import Details from './Details';
import Options from './Options';
import Ratings from './Ratings';
import Gallery from './Gallery';
import ReviewSection from './review/ReviewSection';
import ProductSwiper from '../ProductSwiper';

const ProductDetails = () => {
  return (
    <div className='pt-6 w-full border-t border-gray-200 dark:border-gray-500'>
      <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 w-full'>
        <Gallery />
        <div className='aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg relative'>
          <Image
            src={helper.images.commercial6}
            alt='Two each of gray, white, and black shirts laying flat.'
            className='h-full w-full object-cover object-center'
            fill
            sizes={helper.images.size}
          />
        </div>
      </div>

      <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 border-b border-gray-200 dark:border-gray-500'>
        <div className='lg:col-span-2 lg:border-r lg:border-gray-200 dark:lg:border-gray-500 lg:pr-8'>
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            Basic Tee 6-Pack
          </h1>
        </div>

        <div className='mt-4 lg:row-span-3 lg:mt-0'>
          <h2 className='sr-only'>Product information</h2>
          <p className='text-3xl tracking-tight '>$192</p>
          <Ratings />
          <Options />
        </div>
        <Details />
      </div>
      <ReviewSection />
      <ProductSwiper />
    </div>
  );
};

export default ProductDetails;
