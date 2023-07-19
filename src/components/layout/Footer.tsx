import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import helper from '@/constants/helper';
import { Text } from '@/components/common/Text';

const Footer = () => {
  return (
    <>
      <footer className='hidden w-11/12 mx-auto justify-between pb-10 md:flex relative'>
        <div className='ml-5 mt-5'>
          <div className='flex gap-2 items-center'>
            <div className='w-[50px]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={helper.icon.logo}
                  alt='Image'
                  sizes={helper.images.size}
                  className='object-cover bg-white h-full w-full'
                />
              </AspectRatio>
            </div>
            <Text variant='lg/semibold/primary' className='dark:text-secondary'>
              Epicola
            </Text>
          </div>
          <p className='pl-0'>
            Stay up to date with the latest discounts
            <br />
            through our social media.
          </p>
          <div className='mt-10 flex gap-3'>
            <a href='https://www.instagram.com' target='_blank'>
              {helper.icon.instagram}
            </a>
            <a href='https://twitter.com' target='_blank'>
              {helper.icon.twitter}
            </a>
            <a href='https://www.linkedin.com/in/long-nguyen-95517b250/' target='_blank'>
              {helper.icon.linkedin}
            </a>
            <a href='https://github.com/nhlong27' target='_blank'>
              {helper.icon.github}
            </a>
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='mx-5 mt-10'>
            <p className='font-medium text-gray-500'>FEATURES</p>
            <ul className='text-sm leading-8'>
              <li>
                <a href='#'>Marketing</a>
              </li>
              <li>
                <a href='#'>Commerce</a>
              </li>
              <li>
                <a href='#'>Analytics</a>
              </li>
              <li>
                <a href='#'>Merchendise</a>
              </li>
            </ul>
          </div>

          <div className='mx-5 mt-10'>
            <p className='font-medium text-gray-500'>SUPPORT</p>
            <ul className='text-sm leading-8'>
              <li>
                <a href='#'>Pricing</a>
              </li>
              <li>
                <a href='#'>Docs</a>
              </li>
              <li>
                <a href='#'>Audition</a>
              </li>
              <li>
                <a href='#'>Art Status</a>
              </li>
            </ul>
          </div>

          <div className='mx-5 mt-10'>
            <p className='font-medium text-gray-500'>DOCUMENTS</p>
            <ul className='text-sm leading-8'>
              <li>
                <a href='#'>Terms</a>
              </li>
              <li>
                <a href='#'>Conditions</a>
              </li>
              <li>
                <a href='#'>Privacy</a>
              </li>
              <li>
                <a href='#'>License</a>
              </li>
            </ul>
          </div>

          <div className='mx-5 mt-10'>
            <p className='font-medium text-gray-500'>DELIVERY</p>
            <ul className='text-sm leading-8'>
              <li>
                <a href='#'>List of countries</a>
              </li>
              <li>
                <a href='#'>Special information</a>
              </li>
              <li>
                <a href='#'>Restrictions</a>
              </li>
              <li>
                <a href='#'>Payment</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <footer className='flex w-full justify-center pb-10 md:hidden'>
        <div className='flex-col flex justify-between w-11/12 mx-auto items-start ml-8'>
          <div className='flex items-center mt-2 gap-24'>
            <div className='w-[50px]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={helper.icon.logo}
                  alt='Image'
                  sizes={helper.images.size}
                  className='object-cover bg-white h-full w-full'
                />
              </AspectRatio>
            </div>
            <Text variant='lg/semibold/primary' className='dark:text-secondary'>
              Epicola
            </Text>
          </div>
          <div className='flex flex-col items-start mt-4'>
            <p className='pl-0'>
              Stay up to date with the latest discounts
              <br />
              through our social media.
            </p>
            <div className='mt-2 flex gap-3'>
              <a href='https://www.instagram.com' target='_blank'>
                {helper.icon.instagram}
              </a>
              <a href='https://twitter.com' target='_blank'>
                {helper.icon.twitter}
              </a>
              <a href='https://www.linkedin.com/in/long-nguyen-95517b250/' target='_blank'>
                {helper.icon.linkedin}
              </a>
              <a href='https://github.com/nhlong27' target='_blank'>
                {helper.icon.github}
              </a>
            </div>
          </div>
        </div>
      </footer>
      <span className='w-11/12 mx-auto border-b border-gray-200 dark:border-gray-500'></span>
      <section className='h-11'>
        <div className='mx-auto flex max-w-[1200px] items-center justify-between px-4 pt-2'>
          <Text variant='sm/light/black'>&copy; 2023 NHLong. All rights reserved.</Text>
          <div className='flex items-center space-x-3'>
            <img
              className='h-8'
              src='https://cdn-icons-png.flaticon.com/512/5968/5968299.png'
              alt='Visa icon'
            />
            <img
              className='h-8'
              src='https://cdn-icons-png.flaticon.com/512/349/349228.png'
              alt='AE icon'
            />
            <img
              className='h-8'
              src='https://cdn-icons-png.flaticon.com/512/5968/5968144.png'
              alt='Apple pay icon'
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
