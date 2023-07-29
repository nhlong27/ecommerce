import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import CartItem from './CartItem';
import Link from 'next/link';
import { useGetCartItemsQuery } from '@/features/catalog/hooks/useGetCartItemsQuery';
import { Session } from 'next-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/common/Text';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

const CartFormSchema = z.object({
  cartItems: z.array(z.string()),
});

const CartSection = ({
  session,
  style = 'profile',
}: {
  session: Session;
  style?: 'profile' | 'sheet';
}) => {
  const { data, isLoading, error } = useGetCartItemsQuery(session.user.email);

  const form = useForm<z.infer<typeof CartFormSchema>>({
    resolver: zodResolver(CartFormSchema),
    defaultValues: {
      cartItems: [],
    },
  });

  function onSubmit(data: z.infer<typeof CartFormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return data ? (
    <div className='flex flex-col h-full w-full'>
      {style === 'sheet' ? (
        <>
          <ScrollArea className='h-[25rem] pr-4'>
            <ul role='list' className='-my-6 divide-y divide-gray-200 dark:divide-gray-500'>
              {data.cartItems.map((item, i) => (
                <CartItem key={i} style={style} item={item} />
              ))}
            </ul>
          </ScrollArea>
          <div className='border-t shrink-0 mt-auto border-gray-200 dark:border-gray-500 px-4 pt-6 sm:px-6 flex flex-col'>
            <div className='flex justify-between text-base font-medium dark:text-white'>
              <p>Total items</p>
              <p>{data.cartItems.length}</p>
            </div>
            <div className='mt-3'>
              <Link
                href='/account/cart'
                className='flex items-center justify-center rounded-md border border-transparent bg-primary dark:bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/70 dark:hover:bg-secondary/70'
              >
                Go to cart
              </Link>
            </div>
          </div>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='cartItems'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormLabel className='text-xl font-medium flex gap-4 items-start'>
                      <p className='text-gray-500'>

                      Total items: <span>{data.cartItems.length}</span>
                      </p>
                      <span className='leading-3'>.</span>
                      <p>
                      Items selected: <span>{form.getValues().cartItems.length}</span>
                      </p>
                    </FormLabel>
                    <FormDescription className='mt-2'>
                      Select the items you want to add to your order.
                    </FormDescription>
                  </div>
                  <div className='w-full flex gap-4 items-center'>
                    <Checkbox
                      checked={form.getValues().cartItems.length === data.cartItems.length}
                      onCheckedChange={(checked) => {
                        return checked
                          ? form.setValue(
                              'cartItems',
                              data.cartItems.map((item) => item.id),
                            )
                          : form.setValue('cartItems', []);
                      }}
                    />
                    <Text variant='base/normal/black'>Select All</Text>
                  </div>
                  <Separator className='my-8' />
                  {data.cartItems.map((item, i) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name='cartItems'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className='flex flex-row w-full items-center space-x-6 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== item.id),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='grow border-b font-normal'>
                              <CartItem item={item} />
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='border-t shrink-0 mt-auto border-gray-200 dark:border-gray-500 px-4 py-6 sm:px-6 flex flex-col'>
              <div className='flex justify-between font-medium dark:text-white text-lg'>
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <p className='mt-0.5 text-sm '>Shipping and taxes calculated at checkout.</p>
              <div className='mt-6 w-full'>
                <Button
                  type='submit'
                  disabled={form.formState.isSubmitting || form.getValues().cartItems.length === 0}
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-primary dark:bg-secondary px-6 py-6 text-base tracking-wider font-medium text-white shadow-sm hover:bg-primary/70 dark:hover:bg-secondary/70'
                >
                  Checkout
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}

      <div className='mt-6 flex justify-center text-center text-sm'>
        <p>
          or{' '}
          <Link href='/catalogue' className='font-medium text-primary dark:text-secondary'>
            Continue Shopping
            <span aria-hidden='true'> &rarr;</span>
          </Link>
        </p>
      </div>
    </div>
  ) : error instanceof Error ? (
    <div className='flex flex-col h-full w-full'>
      <Text variant='base/normal/danger'>
        {error?.message ?? 'Something went wrong. Please try again later.'}
      </Text>
    </div>
  ) : (
    <div className='flex flex-col h-full w-full'>
      <ScrollArea className='mt-8 w-full grow pr-8'>
        <ul role='list' className='-my-6 divide-y divide-gray-200 dark:divide-gray-500'>
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} />
            ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default CartSection;
