import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { useGetProductsQuery } from '../hooks/useGetProductsQuery';
import ProductCard from './product/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductSwiper() {
  const { data, isLoading, error } = useGetProductsQuery();
  return (
    <div className='mx-auto w-3/4 lg:w-11/12 pb-8 pt-12 relative'>
      <Link href='/catalogue' className='absolute right-0 top-4 text-sm text-slate-500 underline-offset-4 hover:underline dark:text-slate-50'>See more</Link>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          700: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1300: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className='w-full h-auto'
      >
        {data
          ? data.products.slice(0,10).map((product, index) => (
              <SwiperSlide className='h-full relative mb-8' key={index}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
}
