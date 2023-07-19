import helper from '@/constants/helper';
import Image from 'next/image';
import React from 'react';

const Gallery = () => {
  return (
    <>
      <div className='aspect-h-4 aspect-w-3  overflow-hidden rounded-lg lg:block relative h-[20rem]'>
        <Image
          src={helper.images.commercial6}
          alt='Two each of gray, white, and black shirts laying flat.'
          className='h-full w-full object-cover object-center'
          fill
          sizes={helper.images.size}
        />
      </div>
      <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
        <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg relative'>
          <Image
            src={helper.images.commercial6}
            alt='Two each of gray, white, and black shirts laying flat.'
            className='h-full w-full object-cover object-center'
            fill
            sizes={helper.images.size}
          />
        </div>
        <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg relative'>
          <Image
            src={helper.images.commercial6}
            alt='Two each of gray, white, and black shirts laying flat.'
            className='h-full w-full object-cover object-center'
            fill
            sizes={helper.images.size}
          />
        </div>
      </div>
    </>
  );
};

export default Gallery;
