import React from 'react';
import { Text } from './common/Text';
import Image from 'next/image';
import helper from '@/constants/helper';
import { Badge } from '@/components/ui/badge';

const Incentives = () => {
  return (
    <div className='pt-8 pb-20 px-8 bg-gradient-to-tl from-secondary/20 via-black-secondary/20 dark:from-black dark:to-slate-800 to-white'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='flex justify-between gap-16 items-center'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <Text variant='3xl/semibold/black'>
              We built our business on great customer service
            </Text>
            <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200'>
              We emphasize our commitment to prioritize customer satisfaction by establishing a
              strong reputation for going above and beyond to meet the needs and expectations of our
              customers.
            </p>
          </div>
          <div className='hidden lg:block relative w-full h-[16rem] xl:h-[18rem] overflow-hidden rounded-md'>
            <Image
              src={helper.images.commercial2}
              alt='incentives'
              className='object-cover'
              fill
              sizes={helper.images.size}
            />
          </div>
        </div>
        <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t-2 border-gray-200 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 '>
          <article className='flex max-w-xl flex-col items-start justify-between'>
            <div className='flex items-center gap-x-4 text-xs'>
              <Badge variant='outline' className='bg-white dark:bg-gray-600 text-base'>
                Free shipping
              </Badge>
            </div>
            <div className='group relative'>
              <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-200'>
                It&apos;s not actually free we just price it into the products. Someone&apos;s paying for it,
                and it&apos;s not us.
              </p>
            </div>
          </article>
          <article className='flex max-w-xl flex-col items-start justify-between'>
            <div className='flex items-center gap-x-4 text-base'>
              <Badge variant='outline' className='bg-white dark:bg-gray-600 text-base'>
                10-year warranty
              </Badge>
            </div>
            <div className='group relative'>
              <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-200'>
                If it breaks in the first 10 years we&apos;ll replace it. After that you&apos;re on your own
                though.
              </p>
            </div>
          </article>
          <article className='flex max-w-xl flex-col items-start justify-between'>
            <div className='flex items-center gap-x-4 text-xs'>
              <Badge variant='outline' className='bg-white dark:bg-gray-600 text-base'>
                Exchanges
              </Badge>
            </div>
            <div className='group relative'>
              <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-200'>
                If you don&apos;t like it, trade it to one of your friends for something of theirs. Don&apos;t
                send it here though.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Incentives;
