import helper from '@/constants/helper';
import Image from 'next/image';
import { Text } from './common/Text';


export default function Promo() {
  return (
    <div className='w-full px-0 md:px-16 pt-4 pb-12 bg-gradient-to-b from-white via-blue-50 to-white dark:bg-none'>
      <Text variant='2xl/semibold/black' className='my-8 px-12 md:px-0'>
        Best Sellers
      </Text>
      <div className='flex flex-col gap-8 md:gap-0 md:flex-row w-full min-h-[20rem] divide-x-[1px] justify-center'>
        <div className='w-11/12 mx-auto md:mx-0 md:w-2/5 flex shadow-lg rounded-l-md overflow-hidden bg-white  dark:bg-transparent'>
          <div className='basis-3/5 relative overflow-hidden'>
            <Image
              src={helper.images.commercial3}
              alt='product1'
              className='object-cover  brightness-75 hover:scale-125 transition-all duration-300'
              fill
            />
          </div>
          <div className='basis-2/5 p-8'>
            <Text variant='lg/bold/black' className='mb-4'>
              Title
            </Text>
            <Text variant='base/normal/black' className='mb-4'>
              Description
            </Text>
          </div>
        </div>
        <div className='w-11/12 mx-auto md:mx-0 md:w-2/5 flex overflow-hidden shadow-lg rounded-r-md bg-white dark:bg-transparent'>
          <div className='basis-2/5 p-8'>
            <Text variant='lg/bold/black' className='mb-4'>
              Title
            </Text>
            <Text variant='base/normal/black' className='mb-4'>
              Description
            </Text>
          </div>
          <div className='basis-3/5 relative overflow-hidden'>
            <Image
              src={helper.images.commercial5}
              alt='product1'
              className='object-cover  brightness-75 hover:scale-125 transition-all duration-300'
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
