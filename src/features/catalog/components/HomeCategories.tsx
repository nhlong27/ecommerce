import React from 'react';
const HomeCategories = () => {
  return (
    <section className='w-full grid max-w-[1200px] grid-cols-2 px-5 lg:grid-cols-3 lg:gap-5 place-items-center'>
      <a className='h-[10rem] w-[10rem]' href='#'>
        <div className='relative cursor-pointer'>
          <img
            className='mx-auto h-auto w-auto brightness-50 duration-300 hover:brightness-100'
            src={'/images/shop.png'}
            alt='bedroom cathegory image'
          />

          <p className='pointer-events-none absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 text-center text-white lg:text-xl'>
            Bedroom
          </p>
        </div>
      </a>

      <a className='h-[10rem] w-[10rem]' href='#'>
        <div className='relative cursor-pointer'>
          <img
            className='mx-auto h-auto w-auto brightness-50 duration-300 hover:brightness-100'
            src={'/images/shop.png'}
            alt='Matrass cathegory image'
          />

          <p className='pointer-events-none absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 text-center text-white lg:text-xl'>
            Matrass
          </p>
        </div>
      </a>

      <a className='h-[10rem] w-[10rem]' href='#'>
        <div className='relative cursor-pointer'>
          <img
            className='mx-auto h-auto w-auto brightness-50 duration-300 hover:brightness-100'
            src={'/images/shop.png'}
            alt='kitchen cathegory image'
          />

          <p className='pointer-events-none absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 text-center text-white lg:text-xl'>
            Outdoor
          </p>
        </div>
      </a>

      <a className='h-[10rem] w-[10rem]' href='#'>
        <div className='relative cursor-pointer'>
          <img
            className='mx-auto h-auto w-auto brightness-50 duration-300 hover:brightness-100'
            src={'/images/shop.png'}
            alt='bedroom cathegory image'
          />

          <p className='pointer-events-none absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 text-center text-white lg:text-xl'>
            Sofa
          </p>
        </div>
      </a>

      <a className='h-[10rem] w-[10rem]' href='#'>
        <div className='relative cursor-pointer'>
          <img
            className='mx-auto h-auto w-auto brightness-50 duration-300 hover:brightness-100'
            src={'/images/shop.png'}
            alt='bedroom cathegory image'
          />

          <p className='pointer-events-none absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 text-center text-white lg:text-xl'>
            Kitchen
          </p>
        </div>
      </a>

      <a className='h-[10rem] w-[10rem]' href='#'>
        <div className='relative cursor-pointer'>
          <img
            className='mx-auto h-auto w-auto brightness-50 duration-300 hover:brightness-100'
            src='/images/shop.png'
            alt='bedroom cathegory image'
          />

          <p className='pointer-events-none absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 text-center text-white lg:text-xl'>
            Living room
          </p>
        </div>
      </a>
    </section>
  );
};

export default HomeCategories;
