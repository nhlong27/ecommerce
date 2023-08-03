import helper from '@/constants/helper';
import Image from 'next/image';
import { Text } from './common/Text';
import { Separator } from './ui/separator';

export default function Promo() {
  return (
    <div className='w-full px-0 md:px-16 pt-4 pb-12 bg-gradient-to-b from-white/10 via-blue-50/20 to-white/70 dark:bg-none flex flex-col justify-center items-center relative'>
      <div className='absolute w-full h-full -z-10 mt-8'>
        <Image
          src={helper.images.commercial14}
          alt='product1'
          className='object-cover brightness-75'
          fill
          sizes={helper.images.size}
        />
      </div>
      <Text variant='3xl/semibold/black' className='mt-8 text-white'>
        Special Offers
      </Text>
      <Text
        variant='base/normal/ghost'
        className='mt-3 max-w-[40rem] mb-8 whitespace-pre-wrap text-center text-blue-100'
      >
        Discover the perfect companion for your moments of relaxation and celebration, as our drinks
        add a touch of joy and flavor to every occasion
      </Text>
      <div className='flex flex-col gap-16 md:gap-3 lg:gap-8 lg:flex-row w-full divide-x-[1px] justify-center px-8 lg:h-[20rem] h-auto'>
        <div className='w-11/12 mx-auto lg:mx-0 lg:w-3/5 flex shadow-lg rounded-md overflow-hidden bg-white dark:bg-black flex-col sm:flex-row'>
          <div className='sm:h-auto h-[20rem] sm:grow w-full relative overflow-hidden '>
            <Image
              src={helper.images.commercial17}
              alt='product1'
              className='object-cover '
              fill
              sizes={helper.images.size}
            />
          </div>
          <div className='w-full sm:w-[40rem] p-8 flex flex-col'>
            <Text variant='lg/bold/black' className='mb-4'>
              Discover Our Exotic Rum Punch
            </Text>
            <Text variant='base/normal/black' className='mb-4 truncate max-h-[15rem] dark:text-gray-300 text-gray-500'>
              Crafted with premium Caribbean rum and an array of tropical fruits, this tantalizing
              cocktail will transport you to sandy shores. Sip away your worries and seize this
              exclusive offer for an unforgettable experience
            </Text>
            <Separator className='mt-auto' />
          </div>
        </div>
        <div className='w-11/12 mx-auto lg:mx-0 lg:w-3/5 flex overflow-hidden shadow-lg rounded-md bg-white dark:bg-black flex-col sm:flex-row '>
          <div className='sm:h-auto h-[20rem] sm:grow w-full relative overflow-hidden'>
            <Image
              src={helper.images.commercial16}
              alt='product2'
              className='object-cover '
              fill
              sizes={helper.images.size}
            />
          </div>
          <div className='w-full sm:w-[40rem] p-8 flex flex-col'>
            <Text variant='lg/bold/black' className='mb-4'>
              Savor the Sophistication of our Classic Cocktai
            </Text>
            <Text variant='base/normal/black' className='mb-4 truncate max-h-[15rem] dark:text-gray-300 text-gray-500'>
              Elevate your evenings with our Gin Fizz Delight! Made with premium gin and a dash of
              bubbly soda, this classic cocktail exudes elegance and refinement
            </Text>
            <Separator className='mt-auto' />
          </div>
        </div>
      </div>
    </div>
  );
}
