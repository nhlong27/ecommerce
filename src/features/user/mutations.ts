import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';
import axios from 'axios';
import { AddToOrderType, OrderType } from './types';

const updateUser = gql`
  mutation updateUser($email: String!, $name: String!, $password: String!) {
    updateUser(email: $email, name: $name, password: $password) {
      id
      name
      email
      emailVerified
      image
      role
    }
  }
`;

const addUser = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
      email
      emailVerified
      image
      role
    }
  }
`;

export const updateUserMutationFn = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  return request(`${GRAPHQL_API_URL}`, updateUser, { email, name, password });
};

export const addUserMutationFn = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  return request(`${GRAPHQL_API_URL}`, addUser, { name, email, password });
};

export const signInMutationFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/callback/credentials`, {
    email,
    password,
  });
};

export const addToOrderServiceMutationFn = async ({
  addToOrder,
}: {
  addToOrder: AddToOrderType;
}) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/order_service`, addToOrder);
};

export const cancelOrderMutationFn = async ({ cancelOrder }: { cancelOrder: OrderType }) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/order_service`, cancelOrder);
};
