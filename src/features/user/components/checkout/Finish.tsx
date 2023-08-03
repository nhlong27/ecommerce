import React from 'react';
import Link from 'next/link';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import helper from '@/constants/helper';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useCancelOrderMutation } from '../../hooks/useCancelOrderMutation';
import { useGetOrderQuery } from '../../hooks/useGetOrderQuery';
import { useQueryClient } from '@tanstack/react-query';
import { BellRing, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

const Finish = () => {
  const router = useRouter();

  const { data, error, isLoading } = useGetOrderQuery(router.query.orderId as string);

  return data ? (
    <TabsContent value='finish'>
      <div className='sm:h-[40rem] h-auto w-full mx-auto flex justify-center items-start bg-white shadow-md dark:bg-black rounded-md overflow-hidden'>
        <div className='flex overflow-hidden w-full sm:h-[40rem] h-auto'>
          <div className='h-full w-1/3 lg:w-1/2 hidden md:block relative'>
            <Image
              src={helper.images.commercial2}
              alt='auth'
              fill
              className='h-full object-cover hover:brightness-110 transition-all duration-1000'
              sizes={helper.images.size}
              priority={true}
            />
          </div>
          <div className='w-full md:w-3/4 lg:w-1/2 flex justify-start items-center flex-col gap-3 py-8'>
            <Card className='w-3/4'>
              <CardHeader>
                <CardTitle>Payment Completed!</CardTitle>
                <CardDescription>You have purchased {data.order.total} products.</CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className=' flex items-center space-x-4 rounded-md border p-4 flex-col sm:flex-row sm:gap-0 gap-3'>
                  <BellRing />
                  <div className='flex-1 space-y-1'>
                    <p className='text-sm font-medium leading-none'>Send mail </p>
                    <p className='text-sm text-muted-foreground'>Send invoice to my email.</p>
                  </div>
                  <Switch />
                </div>
                <ScrollArea className='h-[15rem] py-4'>
                  {data.order.orderItems?.map((item, i) => (
                    <div key={i} className='flex gap-4 border-b p-4 flex-col sm:flex-row'>
                      <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
                      <div className='relative h-[5rem] w-[5rem]'>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_DATA_SOURCE}${item.productImage}`}
                          alt='auth'
                          fill
                          className='h-full w-full object-contain'
                          sizes={helper.images.size}
                          priority={true}
                        />
                      </div>

                      <div
                        key={i}
                        className='mb-4 grid grid-cols-[10rem_1fr] items-start pb-4 last:mb-0 last:pb-0'
                      >
                        <div className='space-y-1'>
                          <p className='text-sm font-medium leading-none truncate'>{item.productTitle}</p>
                          <p className='text-sm text-muted-foreground'>{item.productPrice}</p>
                          <p className='text-sm text-muted-foreground'>{item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button onClick={() => router.push('/account/cart')} className='w-full'>
                  <Check className='hidden sm:block mr-2 h-4 w-4' /> Go back to cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </TabsContent>
  ) : null;
};

export default Finish;
