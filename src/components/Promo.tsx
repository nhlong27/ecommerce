import helper from '@/constants/helper';
import Image from 'next/image';
import { Text } from './common/Text';


export default function Promo() {
  return (
    <div className='w-full px-0 md:px-16 pt-4 pb-12 bg-gradient-to-b from-white via-blue-50 to-white dark:bg-none flex flex-col justify-center items-center'>
      <Text variant='2xl/semibold/black' className='mt-8'>
        Special Offers
      </Text>
      <Text variant='base/normal/ghost' className='mt-3 max-w-[40rem] mb-8 whitespace-pre-wrap text-center'>
      Discover the perfect companion for your moments of relaxation and celebration, as our drinks add a touch of joy and flavor to every occasion
      </Text>
      <div className='flex flex-col gap-16 md:gap-3 lg:gap-8 md:flex-row w-full divide-x-[1px] justify-center px-8'>
        <div className='w-11/12 mx-auto lg:mx-0 lg:w-3/5 flex shadow-lg rounded-md overflow-hidden bg-white  dark:bg-transparent'>
          <div className='h-[18rem] w-[12rem] relative overflow-hidden'>
            <Image
              src={helper.images.commercial17}
              alt='product1'
              className='object-contain object-left '
              fill
              sizes={helper.images.size}
            />
          </div>
          <div className='grow p-8'>
            <Text variant='lg/bold/black' className='mb-4'>
              Title
            </Text>
            <Text variant='base/normal/black' className='mb-4'>
              Description
            </Text>
          </div>
        </div>
        <div className='w-11/12 mx-auto lg:mx-0 lg:w-3/5 flex overflow-hidden shadow-lg rounded-md bg-white dark:bg-transparent'>
          <div className='h-[18rem] w-[12rem] relative overflow-hidden'>
            <Image
              src={helper.images.commercial16}
              alt='product2'
              className='object-contain object-left'
              fill
              sizes={helper.images.size}
            />
          </div>
          <div className='grow p-8'>
            <Text variant='lg/bold/black' className='mb-4'>
              Title
            </Text>
            <Text variant='base/normal/black' className='mb-4'>
              Description
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
