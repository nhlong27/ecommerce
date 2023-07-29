import helper from '@/constants/helper';
import Image from 'next/image';
import React from 'react';

const Gallery = ({src} : {src: string}) => {
  return (
    <>
      <div className='aspect-h-4 aspect-w-3  overflow-hidden rounded-lg lg:block relative h-[20rem]'>
        <Image
          src={`${process.env.NEXT_PUBLIC_DATA_SOURCE}${src}`}
          alt='Product image'
          className='h-full w-full object-contain'
          fill
          placeholder='blur'
          blurDataURL={helper.images.blur}
          sizes={helper.images.size}
        />
      </div>
      <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
        <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg relative'>
        <Image
          src={`${process.env.NEXT_PUBLIC_DATA_SOURCE}${src}`}
          alt='Product image'
          className='h-full w-full object-cover object-center'
          fill
          placeholder='blur'
          blurDataURL={helper.images.blur}
          sizes={helper.images.size}
        />
        </div>
        <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg relative'>
        <Image
          src={`${process.env.NEXT_PUBLIC_DATA_SOURCE}${src}`}
          alt='Product image'
          className='h-full w-full object-cover object-top'
          fill
          placeholder='blur'
          blurDataURL={helper.images.blur}
          sizes={helper.images.size}
        />
        </div>
      </div>
    </>
  );
};

export default Gallery;
