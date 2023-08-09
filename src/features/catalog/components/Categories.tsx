import { Text } from '@/components/common/Text';
import helper from '@/constants/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const Categories = () => {
  return (
    <div className='bg-secondary/10'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-16'>
          <Text variant='2xl/semibold/black'>Categories</Text>
          <Text variant='sm/normal/ghost' className='mt-3'>Experience ultimate refreshment and hydration with our wide selection of drinks, designed to keep you energized and revitalized throughout the day</Text>

          <div className='mt-6 space-y-12 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:space-y-0'>
            <div className='group relative'>
              <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64'>
                <Image
                  src={helper.images.commercial10}
                  alt='coffee_tea'
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <h3 className='mt-6 text-sm '>
                <Link href='/catalogue?category=coffee_tea&page=1'>
                  <span className='absolute inset-0'></span>
                  Coffees / Teas
                </Link>
              </h3>
              <p className='text-base font-semibold '>Our Coffee and Tea Collection</p>
            </div>
            <div className='group relative'>
              <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64'>
              <Image
                  src={helper.images.commercial12}
                  alt='energy_drink'
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <h3 className='mt-6 text-sm '>
                <Link href='/catalogue?category=energy_drink&page=1'>
                  <span className='absolute inset-0'></span>
                  Energy drinks
                </Link>
              </h3>
              <p className='text-base font-semibold '>Refreshing, powerful flavors</p>
            </div>
            <div className='group relative'>
              <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64'>
              <Image
                  src={helper.images.commercial5}
                  alt='juice_shake'
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <h3 className='mt-6 text-sm '>
                <Link href='/catalogue?category=juice_shake&page=1'>
                  <span className='absolute inset-0'></span>
                  Juice Shakes
                </Link>
              </h3>
              <p className='text-base font-semibold '>Natural, refreshing ingredients</p>
            </div>
            <div className='group relative'>
              <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64'>
              <Image
                  src={helper.images.commercial8}
                  alt='sport_drink'
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <h3 className='mt-6 text-sm '>
                <Link href='/catalogue?category=sport_drink&page=1'>
                  <span className='absolute inset-0'></span>
                  Sport drinks
                </Link>
              </h3>
              <p className='text-base font-semibold '>Stay hydrated, fuel performance</p>
            </div>
            <div className='group relative'>
              <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64'>
              <Image
                  src={helper.images.commercial6}
                  alt='water'
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <h3 className='mt-6 text-sm '>
                <Link href='/catalogue?category=water&page=1'>
                  <span className='absolute inset-0'></span>
                  Pure water
                </Link>
              </h3>
              <p className='text-base font-semibold '>Embrace the simplicity and purity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
