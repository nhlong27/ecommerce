import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import helper from '@/constants/helper';
import { Text } from '../common/Text';
import SearchBar from '../common/SearchBar';
import { AspectRatio } from '../ui/aspect-ratio';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Hero = () => {
  return (
    <div className='relative mb-16 px-12 rounded-lg pt-[20px] pb-[10px] lg:pt-[40px]'>
      <div className='h-[30rem]'>
        <div className='flex h-full flex-wrap -mx-4'>
          <div className='w-full h-full px-4 lg:w-5/12'>
            <div className='h-full px-0 md:px-8 pt-4 text-center lg:text-left'>
              <Text variant='4xl/bold/black' className='dark:text-white'>
                Revitalize Your Thirst with Our Refreshing Soft Drinks
              </Text>
              <Text
                variant='xl/light/primary'
                className='my-4 dark:text-secondary dark:brightness-125'
              >
                A Taste Sensation Delivered To Your Doorstep!
              </Text>
              <div className='w-11/12 mx-auto flex mt-16 flex-col items-center'>
                <SearchBar />
                <Link className='  mt-5' href='/catalogue'>
                  <Text
                    variant='base/normal/secondary'
                    className='hover:underline dark:text-tertiary'
                  >
                    Or browse our <span className='text-primary dark:text-white'>catalogue</span>
                  </Text>
                </Link>
              </div>
              <div className='pt-16'>
                <Text variant='sm/normal/black' className='mb-4 dark:text-white'>
                  Our Top Manufacturers
                </Text>
                <div className='flex items-center justify-center space-x-4 w-full h-20 gap-4'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className='w-24 md:w-32'>
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              src={helper.icon.pepsi}
                              alt='pepsi'
                              className='object-contain h-full w-full'
                              fill
                              sizes={helper.images.size}
                            />
                          </AspectRatio>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>PepsiCo</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className='w-24 md:w-32'>
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              src={helper.icon.coca}
                              alt='coca'
                              className='object-contain h-full w-full'
                              fill
                              sizes={helper.images.size}
                            />
                          </AspectRatio>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Coca-Cola</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className='w-24 md:w-32'>
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              src={helper.icon.monster}
                              alt='monster'
                              className='object-contain h-full w-full'
                              fill
                              sizes={helper.images.size}
                            />
                          </AspectRatio>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Monster</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
          <div className='hidden lg:block lg:w-[2rem]'></div>
          <div className='h-[30rem] grow w-full px-4 lg:w-6/12'>
            <div className='hidden h-full lg:block lg:ml-auto lg:text-right'>
              <div className='h-full w-full relative z-10 pt-11 flex lg:pt-0'>
                <div className='w-full absolute top-0 z-20 text-center'>
                  <Text variant='xl/semibold/white' className='mt-8 mb-4 italic tracking-widest'>
                    Always something new
                  </Text>
                  <Popover>
                    <PopoverTrigger>
                      <div className='border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 px-4 py-1'>See what's new this week</div>
                    </PopoverTrigger>
                    <PopoverContent>Feature in development.</PopoverContent>
                  </Popover>
                </div>
                <div className='relative h-full w-1/2 overflow-hidden rounded-sm'>
                  <Image
                    src={helper.images.commercial13}
                    alt='hero'
                    sizes={helper.images.size}
                    className='h-full object-cover brightness-75 hover:scale-110 transition-all duration-300'
                    fill
                    priority={true}
                  />
                </div>
                <div className='relative h-full w-1/2 overflow-hidden rounded-sm'>
                  <Image
                    src={helper.images.commercial11}
                    alt='hero'
                    sizes={helper.images.size}
                    className='h-full  object-cover brightness-75 hover:scale-110 transition-all duration-300'
                    fill
                    priority={true}
                  />
                </div>
                <span className='hidden lg:block absolute -right-8 -top-8 z-[-1]'>
                  <svg
                    width='93'
                    height='93'
                    viewBox='0 0 93 93'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='2.5' cy='2.5' r='2.5' fill='#3056D3' />
                    <circle cx='2.5' cy='24.5' r='2.5' fill='#3056D3' />
                    <circle cx='2.5' cy='46.5' r='2.5' fill='#3056D3' />
                    <circle cx='2.5' cy='68.5' r='2.5' fill='#3056D3' />
                    <circle cx='2.5' cy='90.5' r='2.5' fill='#3056D3' />
                    <circle cx='24.5' cy='2.5' r='2.5' fill='#3056D3' />
                    <circle cx='24.5' cy='24.5' r='2.5' fill='#3056D3' />
                    <circle cx='24.5' cy='46.5' r='2.5' fill='#3056D3' />
                    <circle cx='24.5' cy='68.5' r='2.5' fill='#3056D3' />
                    <circle cx='24.5' cy='90.5' r='2.5' fill='#3056D3' />
                    <circle cx='46.5' cy='2.5' r='2.5' fill='#3056D3' />
                    <circle cx='46.5' cy='24.5' r='2.5' fill='#3056D3' />
                    <circle cx='46.5' cy='46.5' r='2.5' fill='#3056D3' />
                    <circle cx='46.5' cy='68.5' r='2.5' fill='#3056D3' />
                    <circle cx='46.5' cy='90.5' r='2.5' fill='#3056D3' />
                    <circle cx='68.5' cy='2.5' r='2.5' fill='#3056D3' />
                    <circle cx='68.5' cy='24.5' r='2.5' fill='#3056D3' />
                    <circle cx='68.5' cy='46.5' r='2.5' fill='#3056D3' />
                    <circle cx='68.5' cy='68.5' r='2.5' fill='#3056D3' />
                    <circle cx='68.5' cy='90.5' r='2.5' fill='#3056D3' />
                    <circle cx='90.5' cy='2.5' r='2.5' fill='#3056D3' />
                    <circle cx='90.5' cy='24.5' r='2.5' fill='#3056D3' />
                    <circle cx='90.5' cy='46.5' r='2.5' fill='#3056D3' />
                    <circle cx='90.5' cy='68.5' r='2.5' fill='#3056D3' />
                    <circle cx='90.5' cy='90.5' r='2.5' fill='#3056D3' />
                  </svg>
                </span>
                <span className='hidden lg:block absolute -left-8 -bottom-8 z-[-1]'>
                  <svg
                    width='93'
                    height='93'
                    viewBox='0 0 93 93'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='2.5' cy='2.5' r='2.5' fill='#3056D3' />
                    <circle cx='2.5' cy='24.5' r='2.5' fill='#3056D3' />
                    <circle cx='2.5' cy='46.5' r='2.5' fill='#3056D3' />
                    <circle cx='2.5' cy='68.5' r='2.5' fill='#3056D3' />
                    <circle cx='2.5' cy='90.5' r='2.5' fill='#3056D3' />
                    <circle cx='24.5' cy='2.5' r='2.5' fill='#3056D3' />
                    <circle cx='24.5' cy='24.5' r='2.5' fill='#3056D3' />
                    <circle cx='24.5' cy='46.5' r='2.5' fill='#3056D3' />
                    <circle cx='24.5' cy='68.5' r='2.5' fill='#3056D3' />
                    <circle cx='24.5' cy='90.5' r='2.5' fill='#3056D3' />
                    <circle cx='46.5' cy='2.5' r='2.5' fill='#3056D3' />
                    <circle cx='46.5' cy='24.5' r='2.5' fill='#3056D3' />
                    <circle cx='46.5' cy='46.5' r='2.5' fill='#3056D3' />
                    <circle cx='46.5' cy='68.5' r='2.5' fill='#3056D3' />
                    <circle cx='46.5' cy='90.5' r='2.5' fill='#3056D3' />
                    <circle cx='68.5' cy='2.5' r='2.5' fill='#3056D3' />
                    <circle cx='68.5' cy='24.5' r='2.5' fill='#3056D3' />
                    <circle cx='68.5' cy='46.5' r='2.5' fill='#3056D3' />
                    <circle cx='68.5' cy='68.5' r='2.5' fill='#3056D3' />
                    <circle cx='68.5' cy='90.5' r='2.5' fill='#3056D3' />
                    <circle cx='90.5' cy='2.5' r='2.5' fill='#3056D3' />
                    <circle cx='90.5' cy='24.5' r='2.5' fill='#3056D3' />
                    <circle cx='90.5' cy='46.5' r='2.5' fill='#3056D3' />
                    <circle cx='90.5' cy='68.5' r='2.5' fill='#3056D3' />
                    <circle cx='90.5' cy='90.5' r='2.5' fill='#3056D3' />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
