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
const Finish = () => {
  const router = useRouter();

  const { data, error, isLoading } = useGetOrderQuery(router.query.orderId as string);

  const queryClient = useQueryClient();

  return data ? (
    <TabsContent value='finish'>
      <Text variant='2xl/semibold/black' className='mb-8'>
        Go back
      </Text>
      <Button
        onClick={() => {
          queryClient.invalidateQueries(['order', router.query.orderId as string]);
          // router.push({
          //   pathname: '/checkout',
          //   query: {
          //     step: 'finish',
          //     orderId: data.order.id,
          //     redirect: 'false',
          //   },
          // });
          window.close();
        }}
        size='lg'
        variant='default'
        className='w-full uppercase tracking-widest'
      >
        Back
      </Button>
    </TabsContent>
  ) : (
    <TabsContent value='finish'>
      <Text variant='2xl/semibold/black' className='mb-8'>
        Payment Completed
      </Text>
    </TabsContent>
  );
};

export default Finish;
