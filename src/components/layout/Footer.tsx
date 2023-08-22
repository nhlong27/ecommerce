import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import helper from '@/constants/helper';
import { Text } from '@/components/common/Text';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className='hidden w-11/12 mx-auto justify-between pb-10 md:flex relative'>
        <div className='ml-5 mt-5'>
          <div className='flex gap-2 items-center'>
            <Link href='/' className='w-[50px]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={helper.icon.logo}
                  alt='Image'
                  sizes={helper.images.size}
                  className='object-cover bg-white h-full w-full'
                />
              </AspectRatio>
            </Link>
            <Link href='/'>
              <Text variant='2xl/semibold/primary' className='dark:text-secondary'>
                Epicola
              </Text>
            </Link>
          </div>
          <p className='pl-0'>
            Stay up to date with the latest discounts
            <br />
            through our social media.
          </p>
          <div className='mt-10 flex gap-3'>
            <Popover>
              <PopoverTrigger>
                <p>{helper.icon.instagram}</p>
              </PopoverTrigger>
              <PopoverContent className='px-4 pt-1 w-auto'>
                Checkout Github or Linkedin links instead.
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <p>{helper.icon.twitter}</p>
              </PopoverTrigger>
              <PopoverContent className='px-4 pt-1 w-auto'>
                Checkout Github or Linkedin links instead.
              </PopoverContent>
            </Popover>
            <a href='https://www.linkedin.com/in/long-nguyen-95517b250/' target='_blank'>
              {helper.icon.linkedin}
            </a>
            <a href='https://github.com/nhlong27' target='_blank'>
              {helper.icon.github}
            </a>
          </div>
        </div>

        <div className='flex gap-6'>
          <Popover>
            <PopoverTrigger>
              <div className='mx-5 mt-10'>
                <p className='font-medium text-gray-500'>FEATURES</p>
                <ul className='text-sm leading-8'>
                  <li>
                    <p>Marketing</p>
                  </li>
                  <li>
                    <p>Commerce</p>
                  </li>
                  <li>
                    <p>Analytics</p>
                  </li>
                  <li>
                    <p>Merchendise</p>
                  </li>
                </ul>
              </div>
            </PopoverTrigger>
            <PopoverContent className='h-8 px-4 pt-1'>Feature in development.</PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>
              <div className='mx-5 mt-10'>
                <p className='font-medium text-gray-500'>SUPPORT</p>
                <ul className='text-sm leading-8'>
                  <li>
                    <p>Pricing</p>
                  </li>
                  <li>
                    <p>Docs</p>
                  </li>
                  <li>
                    <p>Audition</p>
                  </li>
                  <li>
                    <p>Art Status</p>
                  </li>
                </ul>
              </div>
            </PopoverTrigger>
            <PopoverContent className='h-8 px-4 pt-1'>Feature in development.</PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>
              <div className='mx-5 mt-10'>
                <p className='font-medium text-gray-500'>DOCUMENTS</p>
                <ul className='text-sm leading-8'>
                  <li>
                    <p>Terms</p>
                  </li>
                  <li>
                    <p>Conditions</p>
                  </li>
                  <li>
                    <p>Privacy</p>
                  </li>
                  <li>
                    <p>License</p>
                  </li>
                </ul>
              </div>
            </PopoverTrigger>
            <PopoverContent className='h-8 px-4 pt-1'>Feature in development.</PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>
              <div className='mx-5 mt-10'>
                <p className='font-medium text-gray-500'>DELIVERY</p>
                <ul className='text-sm leading-8'>
                  <li>
                    <p>List of countries</p>
                  </li>
                  <li>
                    <p>Special information</p>
                  </li>
                  <li>
                    <p>Restrictions</p>
                  </li>
                  <li>
                    <p>Payment</p>
                  </li>
                </ul>
              </div>
            </PopoverTrigger>
            <PopoverContent className='h-8 px-4 pt-1'>Feature in development.</PopoverContent>
          </Popover>
        </div>
      </footer>
      <footer className='flex w-full justify-center pb-10 md:hidden'>
        <div className='flex-col flex justify-between w-11/12 mx-auto items-start ml-8'>
          <div className='flex items-center mt-2 gap-4'>
            <Link href='/' className='w-[50px]'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={helper.icon.logo}
                  alt='Image'
                  sizes={helper.images.size}
                  className='object-cover bg-white h-full w-full'
                />
              </AspectRatio>
            </Link>
            <Link href='/'>
              <Text variant='lg/semibold/primary' className='dark:text-secondary'>
                Epicola
              </Text>
            </Link>
          </div>
          <div className='flex flex-col items-start mt-4'>
            <p className='pl-0'>
              Stay up to date with the latest discounts
              <br />
              through our social media.
            </p>
            <div className='mt-2 flex gap-3'>
              <Popover>
                <PopoverTrigger>
                  <p>{helper.icon.instagram}</p>
                </PopoverTrigger>
                <PopoverContent className='h-auto px-4 pt-1'>
                  Checkout Github or Linkedin links instead.
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <p>{helper.icon.twitter}</p>
                </PopoverTrigger>
                <PopoverContent className='h-auto px-4 pt-1'>
                  Checkout Github or Linkedin links instead.
                </PopoverContent>
              </Popover>
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
      <section className='h-12'>
        <div className='mx-auto flex max-w-[1200px] items-center justify-between px-4 pt-2'>
          <Text variant='sm/light/black'>&copy; 2023 NHLong. All rights reserved.</Text>
          <div className='flex items-center space-x-3'>
            <Image
              src='https://cdn-icons-png.flaticon.com/512/5968/5968299.png'
              alt='Visa icon'
              width={32}
              height={8}
            />
            <Image
              className='h-8'
              src='https://cdn-icons-png.flaticon.com/512/349/349228.png'
              alt='AE icon'
              width={32}
              height={8}
            />
            <Image
              className='h-8'
              src='https://cdn-icons-png.flaticon.com/512/5968/5968144.png'
              alt='Apple pay icon'
              width={32}
              height={8}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
