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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CartItemSchema } from '@/features/catalog/types';
import { useAddToOrderServiceMutation } from '../../hooks/useAddToOrderServiceMutation';
import { useRouter } from 'next/router';

const CartFormSchema = z.object({
  cartItems: z.array(
    CartItemSchema,
  ),
});

const CartSection = ({
  session,
  style = 'profile',
}: {
  session: Session;
  style?: 'profile' | 'sheet';
}) => {
  const { data, error } = useGetCartItemsQuery(session.user.email);
  const addToOrderServiceMutation = useAddToOrderServiceMutation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof CartFormSchema>>({
    resolver: zodResolver(CartFormSchema),
    defaultValues: {
      cartItems: [],
    },
  });

  function onSubmit(result: z.infer<typeof CartFormSchema>) {
    setIsSubmitting(true);
    const addToOrder = {
      status: 'pending',
      userId: data?.cartItems[0].userId as number,
      cartItems: result.cartItems.map((item) => {
        let { userId, id, ...rest } = item;
        return { ...rest};
      }),
    };
    addToOrderServiceMutation.mutate(
      { addToOrder },
      {
        onSuccess: (response) => {
          toast({
            title: 'You submitted a total of:',
            description: (
              <div className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                <p className='text-white'>{response.data.order.total} products</p>
              </div>
            ),
          });

          console.log(response);

          setIsSubmitting(false);
          router.push({ pathname: '/checkout', query: {  orderId: response.data.order.id } });
        },
        onError: (error) => {
          console.log(error);
          toast({
            title: 'Command failed',
            description: 'Check console for error message',
            variant: 'destructive',
          });
          setIsSubmitting(false);
        },
      },
    );
  }

  return data ? (
    <div className='flex flex-col h-full w-full'>
      {style === 'sheet' ? (
        <>
          <ScrollArea className='h-[25rem] pr-4'>
            <ul role='list' className=' divide-y divide-gray-200 dark:divide-gray-500'>
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
                    <FormField
                      control={form.control}
                      name='cartItems'
                      render={({ field }) => {
                        return (
                          <FormItem className='flex flex-row justify-start items-center space-x-6 space-y-0'>
                            <FormControl>
                              <Checkbox
                                checked={
                                  form.getValues().cartItems.length === data.cartItems.length
                                }
                                onCheckedChange={(checked) => {
                                  console.log({ data, form: form.getValues().cartItems });

                                  return checked
                                    ? field.onChange([...data.cartItems])
                                    : field.onChange([]);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        );
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
                                checked={field.value?.some((each) => each.id === item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, { ...item }])
                                    : field.onChange(
                                        field.value?.filter((each) => each.id !== item.id),
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
                  disabled={isSubmitting || form.getValues().cartItems.length === 0}
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
      <Alert
        variant='destructive'
        className='flex gap-4 items-center dark:bg-slate-800 dark:text-red-400 '
      >
        <AlertTitle className='text-2xl'>!</AlertTitle>
        <AlertDescription className='text-xl'>
          {error?.message ?? 'Something went wrong. Please try again later.'}
        </AlertDescription>
      </Alert>
    </div>
  ) : (
    <div className='flex flex-col h-full w-full'>
      {style !== 'sheet' && (
        <div className='mb-4'>
          <div className=' flex gap-8 items-start'>
            <Skeleton className='h-8 w-28' />

            <Skeleton className='h-8 w-28' />
          </div>
          <Skeleton className='mt-4 h-4 w-60' />
        </div>
      )}
      <ScrollArea className='mt-8 w-full grow pr-8'>
        <ul
          role='list'
          className={`-my-6 divide-y divide-gray-200 dark:divide-gray-500  ${
            style === 'sheet' ? 'h-[25rem]' : ''
          }`}
        >
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <li className='flex gap-4 py-6' key={i}>
                <Skeleton className='h-24 w-24 flex-shrink-0 rounded-md ' />
                <div className='grow ml-4 grid grid-cols-2 grid-rows-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-8' />
                  <Skeleton className='h-4 w-8' />
                </div>
              </li>
            ))}
        </ul>
        <div className='mt-16 w-full'>
          <div className='flex justify-between mb-8'>
            <Skeleton className='h-16 w-24' />
            <Skeleton className='h-16 w-24' />
          </div>
          <Skeleton className='h-16 w-full rounded-md' />
          <Skeleton className='mt-6 h4 w-full' />
        </div>
      </ScrollArea>
    </div>
  );
};

export default CartSection;
