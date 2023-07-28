import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { Text } from '@/components/common/Text';
import { BreadCrumbs } from '@/features/catalog';
import { useAtom } from 'jotai';
import { accountSectionAtom } from '@/pages/account';

const frameworks = [
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
  const [value, setValue] = useAtom(accountSectionAtom);

  return (
    <>
      <div className='hidden lg:block lg:basis-1/4 min-h-screen px-4'>
        <Tabs defaultValue='profile' className='w-full'>
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
            <TabsTrigger
              onClick={() => setValue('profile')}
              value='profile'
              className='w-full justify-start'
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setValue('cart')}
              value='cart'
              className='w-full justify-start'
            >
              Cart
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setValue('history')}
              value='history'
              className='w-full justify-start'
            >
              Order History
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setValue('payment')}
              value='payment'
              className='w-full justify-start'
            >
              Payment Details
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className='block lg:hidden pb-8'>
        <Text variant='3xl/semibold/black'>
          {value === 'profile' ? 'User Profile' : value === 'cart' ? 'User Cart' : value === 'payment' ? 'Payment Details' : 'Order History'}
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
                ? frameworks.find((framework) => framework.value === value)?.label
                : 'Select section...'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === framework.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default AccountMenu;
