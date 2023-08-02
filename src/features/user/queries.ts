import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';
import { OrderSchema, OrdersSchema } from './types';
import { z } from 'zod';

const users = gql`
  {
    users {
      id
      name
      email
    }
  }
`;

const orders = gql`
  query orders($email: String!) {
    orders(email: $email) {
      id
      userId
      status
      total
    }
  }
`;

const order = gql`
  query order($orderId: String!) {
    order(orderId: $orderId) {
      id
      userId
      status
      total
      orderItems {
        id
        productId
        productTitle
        productPrice
        productCategory
        productSize
        productImage
        productQuantity
        quantity
      }
    }
  }
`;

export const getUsersQuery = () => {
  return {
    queryKey: ['users'],
    queryFn: async () => request(`${GRAPHQL_API_URL}`, users),
  };
};

export const getOrdersQuery = (email: string) => {
  return {
    queryKey: ['orders'],
    queryFn: async () => {
      let response = await request(`${GRAPHQL_API_URL}`, orders, { email });
      return OrdersSchema.parse(response);
    },
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  };
};

export const getOrderQuery = (id: string) => {
  return {
    queryKey: ['order', id],
    queryFn: async () => {
      let response = await request(`${GRAPHQL_API_URL}`, order, { orderId: id });
      return z.object({ order: OrderSchema }).parse(response);
    },
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  };
};
