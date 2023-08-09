import { Skeleton } from '@/components/ui/skeleton';
import AlertError from '@/features/catalog/components/AlertError';
import React from 'react';
import { useGetPaymentDetailsQuery } from '../hooks/useGetPaymentDetailsQuery';
import { Session } from 'next-auth';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const PaymentDetails = ({ session }: { session: Session }) => {
  const { data, error } = useGetPaymentDetailsQuery(session.user.email);
  return data ? (
    <div>
      <Table>
        <TableCaption>A list of your recent payments.</TableCaption>
        <TableHeader>
          <TableRow className=''>
            <TableHead className='w-[100px] text-right'>Payment ID</TableHead>
            <TableHead className='text-right'>Order ID</TableHead>
            <TableHead className='text-right'>Amount Paid</TableHead>
            <TableHead className='text-right'>Currency</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-gray-100 dark:bg-slate-900'>
          {data.paymentDetails.reverse().map((payment) => {
            return (
              <TableRow key={payment.id}>
                <TableCell className='font-medium text-right'>{payment.id}</TableCell>
                <TableCell className='text-right'>{payment.orderId}</TableCell>
                <TableCell className='capitalize text-right'>
                  {payment.amount_total / 100}
                </TableCell>
                <TableCell className='capitalize text-right'>{payment.currency}</TableCell>
                <TableCell className='capitalize text-right'>{payment.status}</TableCell>
                <TableCell className='text-right'></TableCell>
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
      <div className='flex justify-between gap-4 mt-4 '>
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
      </div>
      <div className='flex justify-between gap-4 mt-4 '>
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
      </div>
      <div className='flex justify-between gap-4 mt-4 '>
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
        <Skeleton className='w-60 h-8' />
      </div>
    </div>
  );
};

export default PaymentDetails;
