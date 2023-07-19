import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { ThemeToggle } from '../ThemeToggle';
import Link from 'next/link';
import helper from '@/constants/helper';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Text } from '../common/Text';
import { signOut, useSession } from 'next-auth/react';
import { CartSection } from '@/features/user';
import { Separator } from '../ui/separator';

const Nav = () => {
  const { data: session } = useSession();

  return (
    <>
      <nav className='hidden md:flex w-11/12 h-full mx-auto'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className='flex gap-2 items-center mr-8'>
              <div className='w-[50px]'>
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={helper.icon.logo}
                    alt='Image'
                    sizes={helper.images.size}
                    fill
                    className='object-cover bg-white h-full w-full'
                  />
                </AspectRatio>
              </div>
              <Text variant='xl/semibold/primary' className='dark:text-secondary'>
                Epicola
              </Text>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Catalogue</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className='ml-auto'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className='w-8 h-8'>
                    <AvatarImage src={session ? `https://github.com/shadcn.png` : ''} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session ? (
                    <>
                      <DropdownMenuItem>
                        <Link href='/account'
                        >Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href='#'
                          onClick={() =>
                            signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SERVER}/` })
                          }
                        >
                          Sign out
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem>
                      <Link href='/auth'>Sign in</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Sheet>
                <SheetTrigger className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 px-4 py-2'>
                  <helper.icon.shop className='h-5 w-5' />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Your cart</SheetTitle>
                    <SheetDescription className='h-screen'>
                      <CartSection />
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <nav className='md:hidden flex w-11/12 h-full mx-auto'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Sheet>
                <SheetTrigger className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 px-4 py-2'>
                  {helper.icon.hamburger}
                </SheetTrigger>

                <SheetContent side='left' className='w-1/2'>
                  <SheetHeader>
                    <SheetTitle className='flex items-center gap-2 border-b border-gray-200 dark:border-gray-500'>
                      <div className='w-[40px]'>
                        <AspectRatio ratio={1 / 1}>
                          <Image
                            src={helper.icon.logo}
                            alt='Image'
                            sizes={helper.images.size}
                            fill
                            className='object-cover bg-white h-full w-full'
                          />
                        </AspectRatio>
                      </div>
                      Epicola
                    </SheetTitle>
                  </SheetHeader>
                  <NavigationMenu>
                    <NavigationMenuList className='flex flex-col items-start'>
                      <NavigationMenuItem>
                        <Link href='/' legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Home
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link href='/' legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Catalogue
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <ThemeToggle />
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </SheetContent>
              </Sheet>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className='w-[40px]'>
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={helper.icon.logo}
                    alt='Image'
                    sizes={helper.images.size}
                    fill
                    className='object-cover bg-white h-full w-full'
                  />
                </AspectRatio>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className='ml-auto'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className='w-6 h-6'>
                    <AvatarImage src={session ? `https://github.com/shadcn.png` : ''} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session ? (
                    <>
                    <DropdownMenuItem>
                      <Link href='/account'
                      >Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href='#'
                        onClick={() =>
                          signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SERVER}/` })
                        }
                      >
                        Sign out
                      </Link>
                    </DropdownMenuItem>
                  </>
                  ) : (
                    <DropdownMenuItem>
                      <Link href='/auth'>Sign in</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
            <NavigationMenuItem></NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href='/account/cart'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 px-4 py-2'
              >
                <helper.icon.shop className='h-4 w-4' />
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </>
  );
};

export default Nav;
