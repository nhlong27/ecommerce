import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';
import { OrderSchema, OrdersSchema, PaymentDetailsSchema, UserSchema } from './types';
import { z } from 'zod';

const user = gql`
  query user($email: String!) {
    user(email: $email) {
      id
      name
      email
      emailVerified
      image
      role
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

const paymentDetails = gql`
  query paymentDetails($email: String!) {
    paymentDetails(email: $email) {
      id
      orderId
      userId
      amount_total
      currency
      status
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

export const getUserQuery = (email: string) => {
  return {
    queryKey: ['user', email],
    queryFn: async () => {
      let response = await request(`${GRAPHQL_API_URL}`, user, { email });
      return z.object({ user: UserSchema }).parse(response);
    },
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

export const getPaymentDetailsQuery = (email: string) => {
  return {
    queryKey: ['paymentDetails', email],
    queryFn: async () => {
      let response = await request(`${GRAPHQL_API_URL}`, paymentDetails, { email });
      return z.object({ paymentDetails: z.array(PaymentDetailsSchema) }).parse(response);
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
