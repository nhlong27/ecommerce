import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import { useGetProductsQuery } from '../hooks/useGetProductsQuery';

export default function ProductSwiper() {
  const { data, isLoading, error } = useGetProductsQuery();
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className='w-full h-[20rem]'
      >
        {data
          ? data.products.map((product: any, index: number) => (
                <SwiperSlide className='h-full relative' key={index}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DATA_SOURCE}${product.image}`}
                    fill
                    className='object-contain hover:scale-110 transition-all duration-300'
                    alt='product'
                  />
                </SwiperSlide>
              ))
          : null}
      </Swiper>
    </>
  );
}
