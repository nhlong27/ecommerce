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
import SearchBar from '../common/SearchBar';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from '../ui/button';
import { useGetUserQuery } from '@/features/user/hooks/useGetUsersQuery';

const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { data: session } = useSession();
  const { data } = useGetUserQuery(session?.user?.email as string);
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
                        href='/catalogue?category=coffee_tea&page=1'
                      >
                        <div className='mb-2 mt-4 text-lg font-medium'>Explore our catalogue</div>
                        <p className='text-sm leading-tight text-muted-foreground'>
                          Search for your product. Or select one of our categories.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <NavigationMenuLink
                    href='/catalogue?category=coffee_tea&page=1'
                    className='col-span-1 h-20 bg-gradient-to-bl from-gray-100 to-white hover:to-gray-100 dark:from-slate-800 dark:to-black dark:hover:to-slate-800 p-3 rounded-md transition-colors duration-100 relative'
                  >
                    Coffees / Teas.
                    <span className='absolute top-1 right-1'>{helper.icon.menu}</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href='/catalogue?category=energy_drink&page=1'
                    className='col-span-1 h-20 bg-gradient-to-bl from-gray-100 to-white hover:to-gray-100 dark:from-slate-800 dark:to-black dark:hover:to-slate-800 p-3 rounded-md transition-colors duration-100 relative'
                  >
                    Energy drinks.
                    <span className='absolute top-1 right-1'>{helper.icon.menu}</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href='/catalogue?category=juice_shake&page=1'
                    className='col-span-1 h-20 bg-gradient-to-bl from-gray-100 to-white hover:to-gray-100 dark:from-slate-800 dark:to-black dark:hover:to-slate-800 p-3 rounded-md transition-colors duration-100 relative'
                  >
                    Juice Shakes.
                    <span className='absolute top-1 right-1'>{helper.icon.menu}</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href='/catalogue?category=sport_drink&page=1'
                    className='col-span-1 h-20 bg-gradient-to-bl from-gray-100 to-white hover:to-gray-100 dark:from-slate-800 dark:to-black dark:hover:to-slate-800 p-3 rounded-md transition-colors duration-100 relative'
                  >
                    Sport drinks.
                    <span className='absolute top-1 right-1'>{helper.icon.menu}</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href='/catalogue?category=water&page=1'
                    className='col-span-1 h-20 bg-gradient-to-bl from-gray-100 to-white hover:to-gray-100 dark:from-slate-800 dark:to-black dark:hover:to-slate-800 p-3 rounded-md transition-colors duration-100 relative'
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
                    <AvatarImage
                      src={
                        session ? `${process.env.NEXT_PUBLIC_S3_BUCKET}/${data?.user.image}` : ''
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session ? (
                    <>
                      <DropdownMenuItem>
                        <Link href='/account/profile' className='flex gap-3 items-center'>
                          <svg
                            width='15'
                            height='15'
                            viewBox='0 0 15 15'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z'
                              fill='currentColor'
                              fillRule='evenodd'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href='#'
                          onClick={() =>
                            signOut({
                              callbackUrl: `${process.env.NEXT_PUBLIC_SERVER}${window.location.pathname}`,
                            })
                          }
                          className='flex gap-3 items-center'
                        >
                          <svg
                            width='15'
                            height='15'
                            viewBox='0 0 15 15'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z'
                              fill='currentColor'
                              fillRule='evenodd'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                          Sign out
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem>
                      <Link href='/auth' className='flex gap-3 items-center'>
                        <svg
                          width='15'
                          height='15'
                          viewBox='0 0 15 15'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M4.5 1C4.22386 1 4 1.22386 4 1.5C4 1.77614 4.22386 2 4.5 2H12V13H4.5C4.22386 13 4 13.2239 4 13.5C4 13.7761 4.22386 14 4.5 14H12C12.5523 14 13 13.5523 13 13V2C13 1.44772 12.5523 1 12 1H4.5ZM6.60355 4.89645C6.40829 4.70118 6.09171 4.70118 5.89645 4.89645C5.70118 5.09171 5.70118 5.40829 5.89645 5.60355L7.29289 7H0.5C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H7.29289L5.89645 9.39645C5.70118 9.59171 5.70118 9.90829 5.89645 10.1036C6.09171 10.2988 6.40829 10.2988 6.60355 10.1036L8.85355 7.85355C9.04882 7.65829 9.04882 7.34171 8.85355 7.14645L6.60355 4.89645Z'
                            fill='currentColor'
                            fillRule='evenodd'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                        Sign in
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 px-4 py-2'>
                  <helper.icon.shop className='h-5 w-5' />
                </SheetTrigger>
                <SheetContent className='flex flex-col'>
                  <SheetHeader>
                    <SheetTitle>
                      <Link onClick={()=>setIsOpen(false)} href='/account/profile' className='text-xl font-semibold'>
                        Your Cart
                      </Link>
                    </SheetTitle>
                    <SheetDescription className='text-sm'>

                        Your Ultimate Cart: Where Shopping Dreams Come True!

                    </SheetDescription>
                  </SheetHeader>
                  {session ? (
                    <CartSection style='sheet' session={session}
                    setIsOpen={setIsOpen} />
                  ) : (
                    <div className='flex flex-col justify-start items-start gap-4'>
                      <Text variant='base/normal/primary' className='dark:text-secondary'>
                        You must sign in to view this section
                      </Text>
                      <Button variant='secondary' className='mt-4 mx-auto' onClick={()=>setIsOpen(false)}>
                        <Link href='/auth'>Sign in</Link>
                      </Button>
                    </div>
                  )}
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
                    <SheetTitle className='flex items-center gap-2 border-b border-gray-200 dark:border-gray-500 w-[40px]'>

                        <AspectRatio ratio={1 / 1}>
                          <Image
                            src={helper.icon.logo}
                            alt='Image'
                            sizes={helper.images.size}
                            fill
                            className='object-cover bg-white h-full w-full'
                          />
                        </AspectRatio>
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
                                  href='/catalogue?category=coffee_tea&page=1'
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
                    <AvatarImage
                      src={
                        session ? `${process.env.NEXT_PUBLIC_S3_BUCKET}/${data?.user.image}` : ''
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session ? (
                    <>
                      <DropdownMenuItem>
                        <Link href='/account/profile' className='flex gap-2 items-center'>
                          <svg
                            width='15'
                            height='15'
                            viewBox='0 0 15 15'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z'
                              fill='currentColor'
                              fillRule='evenodd'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href='#'
                          onClick={() =>
                            signOut({
                              callbackUrl: `${process.env.NEXT_PUBLIC_SERVER}${window.location.pathname}`,
                            })
                          }
                          className='flex gap-2 items-center'
                        >
                          <svg
                            width='15'
                            height='15'
                            viewBox='0 0 15 15'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z'
                              fill='currentColor'
                              fillRule='evenodd'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                          Sign out
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem>
                      <Link href='/auth' className='flex gap-2 items-center'>
                        <svg
                          width='15'
                          height='15'
                          viewBox='0 0 15 15'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M4.5 1C4.22386 1 4 1.22386 4 1.5C4 1.77614 4.22386 2 4.5 2H12V13H4.5C4.22386 13 4 13.2239 4 13.5C4 13.7761 4.22386 14 4.5 14H12C12.5523 14 13 13.5523 13 13V2C13 1.44772 12.5523 1 12 1H4.5ZM6.60355 4.89645C6.40829 4.70118 6.09171 4.70118 5.89645 4.89645C5.70118 5.09171 5.70118 5.40829 5.89645 5.60355L7.29289 7H0.5C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H7.29289L5.89645 9.39645C5.70118 9.59171 5.70118 9.90829 5.89645 10.1036C6.09171 10.2988 6.40829 10.2988 6.60355 10.1036L8.85355 7.85355C9.04882 7.65829 9.04882 7.34171 8.85355 7.14645L6.60355 4.89645Z'
                            fill='currentColor'
                            fillRule='evenodd'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                        Sign in
                      </Link>
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
