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
import { Skeleton } from '../ui/skeleton';
import SearchBar from '../common/SearchBar';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from '../ui/button';

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
                <ul className='grid gap-8 p-6 w-[700px] grid-cols-5'>
                  <li className='col-span-5 flex justify-center items-center gap-6 bg-gradient-to-bl from-gray-100 dark:from-gray-800 dark:via-transparent dark:to-transparent via-white to-white rounded-md'>
                    <SearchBar />
                    <NavigationMenuLink asChild>
                      <Link
                        className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md pl-3'
                        href='/catalogue'
                      >
                        <div className='mb-2 mt-4 text-lg font-medium'>Explore our catalogue</div>
                        <p className='text-sm leading-tight text-muted-foreground'>
                          Search for your product. Or select one of our categories.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <NavigationMenuLink
                    href='/catalogue/coffee_tea'
                    className='col-span-1 h-20 hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded-md transition-colors duration-100 relative'
                  >
                    Coffees / Teas.
                    <span className='absolute top-1 right-1'>{helper.icon.menu}</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href='/catalogue/energy_drink'
                    className='col-span-1 h-20 hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded-md transition-colors duration-100 relative'
                  >
                    Energy drinks.
                    <span className='absolute top-1 right-1'>{helper.icon.menu}</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href='/catalogue/juice_shake'
                    className='col-span-1 h-20 hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded-md transition-colors duration-100 relative'
                  >
                    Juice Shakes.
                    <span className='absolute top-1 right-1'>{helper.icon.menu}</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href='/catalogue/sport_drink'
                    className='col-span-1 h-20 hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded-md transition-colors duration-100 relative'
                  >
                    Sport drinks.
                    <span className='absolute top-1 right-1'>{helper.icon.menu}</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href='/catalogue/water'
                    className='col-span-1 h-20 hover:bg-gray-100 dark:hover:bg-gray-800 p-3 rounded-md transition-colors duration-100 relative'
                  >
                    Water.
                    <span className='absolute top-1 right-1'>{helper.icon.menu}</span>
                  </NavigationMenuLink>
                </ul>
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
                    <AvatarImage src={session ? 'https://github.com/shadcn.png' : ''} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session ? (
                    <>
                      <DropdownMenuItem>
                        <Link href='/account'>Profile</Link>
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
                    <SheetTitle>
                      <Text variant='2xl/bold/black'>
                        Cart
                      </Text>
                    </SheetTitle>
                    <SheetDescription className='h-screen'>
                      {session ? <CartSection /> : <div className='flex flex-col justify-start items-start gap-4'>
                        <Text variant='base/normal/primary' className='dark:text-secondary'>
                        You must sign in to view this section
                        </Text>
                        <Button variant='secondary' className='mt-4 mx-auto'>
                          <Link href='/auth'>Sign in</Link>
                        </Button>
                        </div>}
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

                <SheetContent side='left' className='md:w-1/2 w-5/6'>
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
                  <ScrollArea className='min-h-screen w-full'>
                    <NavigationMenu>
                      <NavigationMenuList className='flex flex-col items-start p-3'>
                        <NavigationMenuItem>
                          <Link href='/' legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                              Home
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <ul className='flex gap-3 py-6 w-full flex-col'>
                            <li className='flex flex-col justify-center items-center gap-6 bg-gradient-to-bl from-gray-100 dark:from-gray-800 dark:via-transparent dark:to-transparent via-white to-white rounded-md'>
                              <SearchBar />
                              <NavigationMenuLink asChild>
                                <Link
                                  className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md pl-3'
                                  href='/catalogue'
                                >
                                  <div className='mb-2 mt-4 text-lg font-medium'>
                                    Explore our catalogue
                                  </div>
                                  <p className='text-sm leading-tight text-muted-foreground'>
                                    Search for your product. Or select one of our categories.
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <ThemeToggle />
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </ScrollArea>
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
                    <AvatarImage src={session ? 'https://github.com/shadcn.png' : ''} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session ? (
                    <>
                      <DropdownMenuItem>
                        <Link href='/account'>Profile</Link>
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
