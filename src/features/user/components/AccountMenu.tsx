import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { Text } from '@/components/common/Text';
import { BreadCrumbs } from '@/features/catalog';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Skeleton } from '@/components/ui/skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setAccountSection } from '@/store/slices/accountSectionSlice';

const sections = [
  {
    value: 'profile',
    label: 'Profile',
  },
  {
    value: 'cart',
    label: 'Cart',
  },
  {
    value: 'history',
    label: 'History',
  },
  {
    value: 'payment',
    label: 'Payment',
  },
];

const AccountMenu = () => {
  const [open, setOpen] = React.useState(false);
  const value = useSelector((state: RootState) => state.accountSectionReducer.accountSection);
  const dispatch = useDispatch();
  const router = useRouter();
  return value && value === router.query.slug?.[0] ? (
    <>
      <div className='hidden lg:block lg:basis-1/4 min-h-screen px-4'>
        <Tabs defaultValue={value} className='w-full'>
          <TabsContent value='profile' className='w-full mb-4'>
            <Text variant='3xl/semibold/black'>User Profile</Text>
          </TabsContent>
          <TabsContent value='cart' className='w-full mb-4'>
            <Text variant='3xl/semibold/black'>User Cart</Text>
          </TabsContent>
          <TabsContent value='history' className='w-full mb-4'>
            <Text variant='3xl/semibold/black'>Order History</Text>
          </TabsContent>
          <TabsContent value='payment' className='w-full mb-4'>
            <Text variant='3xl/semibold/black'>Payment Details</Text>
          </TabsContent>
          <BreadCrumbs routerQueries={['account', value]} />
          <TabsList className='w-full flex flex-col h-auto'>
            <Link href='/account/profile' className='w-full'>
              <TabsTrigger value='profile' className='w-full justify-start'>
                Profile
              </TabsTrigger>
            </Link>
            <Link href='/account/cart' className='w-full'>
              <TabsTrigger value='cart' className='w-full justify-start'>
                Cart
              </TabsTrigger>
            </Link>
            <Link href='/account/history' className='w-full'>
              <TabsTrigger value='history' className='w-full justify-start'>
                Order History
              </TabsTrigger>
            </Link>
            <Link href='/account/payment' className='w-full'>
              <TabsTrigger value='payment' className='w-full justify-start'>
                Payment Details
              </TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
      </div>
      <div className='block lg:hidden pb-8'>
        <Text variant='3xl/semibold/black'>
          {value === 'profile'
            ? 'User Profile'
            : value === 'cart'
            ? 'User Cart'
            : value === 'payment'
            ? 'Payment Details'
            : 'Order History'}
        </Text>
        <div className='w-1/2'>
          <BreadCrumbs routerQueries={['account', value]} />
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-[200px] justify-between'
            >
              {value
                ? sections.find((framework) => framework.value === value)?.label
                : 'Select section...'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandGroup>
                {sections.map((section, i) => (
                  <Link href={`/account/${section.value}`} key={i}>
                    <CommandItem
                      key={section.value}
                      onSelect={(currentValue) => {
                        dispatch(setAccountSection(currentValue === value ? '' : currentValue));
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === section.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {section.label}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  ) : (
    <>
      <div className='hidden lg:block lg:basis-1/4 min-h-screen px-4'>
        <Skeleton className='w-full h-full' />
      </div>
      <div className='block lg:hidden pb-8 w-full h-[10rem]'>
        <Skeleton className='w-full h-full' />
      </div>
    </>
  );
};

export default AccountMenu;
