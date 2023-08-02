import React from 'react';
import { useGetOrdersQuery } from '../hooks/useGetOrdersQuery';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const OrderHistory = () => {
  const { data: session } = useSession();
  const { data, error, isLoading } = useGetOrdersQuery(session?.user.email as string);
  const router = useRouter();
  console.log(data);
  return data ? (
    <div>
      {data.orders.map((order) => {
        return (
          <div key={order.id}>
            <div>Order ID: {order.id}</div>
            <div>Order Total: {order.total}</div>
            <div>Order Status: {order.status}</div>
            {/* <div>Order Items: {order.line_items.map((item) => {
          return <div key={item.id}>
            <div>Item ID: {item.id}</div>
            <div>Item Name: {item.name}</div>
            <div>Item Price: {item.price}</div>
            <div>Item Quantity: {item.quantity}</div>
          </div>;
        })}</div> */}
            <Button
              variant='default'
              onClick={() =>
                router.push({
                  pathname: '/checkout',
                  query: {
                    orderId: order.id,
                  },
                })
              }
            >
              View
            </Button>
          </div>
        );
      })}
    </div>
  ) : error instanceof Error ? (
    <div>{error.message}</div>
  ) : isLoading ? (
    <div>Loading...</div>
  ) : null;
};

export default OrderHistory;
