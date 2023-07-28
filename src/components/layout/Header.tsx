import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

const Nav = dynamic(() => import('./Nav'), {
  loading: () => (
    <>
    <nav className='hidden md:flex w-11/12 h-full mx-auto'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className='flex gap-2 items-center mr-8'>
            <Skeleton className='w-8 h-8 rounded-full' />
            <Skeleton className='h-4 w-8' />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Skeleton className='h-4 w-8' />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Skeleton className='h-4 w-8' />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Skeleton className='h-4 w-8' />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className='ml-auto'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Skeleton className='w-8 h-8 rounded-full' />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Skeleton className='h-4 w-8' />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
    <nav className='flex md:hidden w-11/12 h-full mx-auto'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className='flex gap-2 items-center mr-8'>
            <Skeleton className='h-4 w-8' />
            <Skeleton className='w-8 h-8 rounded-full' />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className='ml-auto'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Skeleton className='w-8 h-8 rounded-full' />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Skeleton className='h-4 w-8' />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
    </>
  ),
  ssr: false,
});

export default function Header() {
  return (
    <div className='sticky z-20 top-0 w-full h-12 md:h-16 transition-all duration-300 text-md tracking-wider font-semibold bg-white dark:bg-black'>
      <Nav />
    </div>
  );
}
