import React from 'react';

const SpecialOffer = () => {
  return (
    <div className='mx-auto max-w-[1200px] px-5'>
      <section className='mt-10 flex max-w-[1200px] justify-between bg-violet-900 px-5'>
        <div className='py-8 px-3 lg:px-16'>
          <p className='text-white'>ONLINE EXCLUSIVE</p>
          <h2 className='pt-6 text-5xl font-bold text-yellow-400'>15% OFF</h2>
          <p className='pt-4 text-white'>
            ACCENT CHAIRS, <br />
            TABLES & OTTOMANS
          </p>
          <a href='#' className='mt-6 bg-amber-400 px-4 py-2 duration-100 hover:bg-yellow-300'>
            Shop now
          </a>
        </div>

        <img
          className='-mr-5 hidden w-[550px] object-cover md:block'
          src='./assets/images/sale-bage.jpeg'
          alt='Rainbow credit card with macbook on a background'
        />
      </section>
    </div>
  );
};

export default SpecialOffer;
