import React from 'react';
import { useGetOrdersQuery } from '../hooks/useGetOrdersQuery';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { Skeleton } from '@/components/ui/skeleton';
import AlertError from '@/features/catalog/components/AlertError';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Session } from 'next-auth';

const OrderHistory = ({ session }: { session: Session }) => {
  const { data, error } = useGetOrdersQuery(session.user.email);
  const router = useRouter();
  return data ? (
    <div>
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow className=''>
            <TableHead className='w-[100px] text-right'>Order ID</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
            <TableHead className='text-right'>Status</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-gray-100 dark:bg-slate-900'>
          {data.orders.map((order) => {
            return (
              <TableRow key={order.id}>
                <TableCell className='font-medium text-right'>{order.id}</TableCell>
                <TableCell className='text-right'>{order.total}</TableCell>
                <TableCell className='capitalize text-right'>{order.status}</TableCell>
                <TableCell className='text-right'>
                  <Button
                    variant='secondary'
                    onClick={() =>
                      router.push({
                        pathname: '/checkout',
                        query: {
                          orderId: order.id,
                        },
                      })
                    }
                  >
                    View status
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  ) : error instanceof Error ? (
    <AlertError error={error} />
  ) : (
    <div className='w-full'>
      <Skeleton className='w-full h-12 my-8' />
      <div className='flex justify-between gap-4 mt-4'>
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
      </div>
      <div className='flex justify-between gap-4 mt-4'>
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
      </div>
      <div className='flex justify-between gap-4 mt-4'>
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
      </div>
    </div>
  );
};

export default OrderHistory;
