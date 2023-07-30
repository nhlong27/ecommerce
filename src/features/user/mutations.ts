import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CartItemType } from '../catalog/types';
import { PaymentIntentType } from './types';

const updateUser = gql`
  mutation updateUser($email: String!, $name: String!) {
    updateUser(email: $email, name: $name) {
      id
      name
      email
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

// const addToOrderService = gql`
//   mutation addToOrderService( $cartItems: [CartItemInput]!) {
//     addToOrderService(cartItems: $cartItems) {
//       userId
//       total
//       status
//       cartItems {
//         id
//         userId
//         productId
//         productTitle
//         productPrice
//         productCategory
//         productSize
//         productImage
//         productQuantity
//         quantity
//       }
//     }
//   }
// `;

export const updateUserMutationFn = async ({ email, name }: { email: string; name: string }) => {
  return request(`${GRAPHQL_API_URL}`, updateUser, { email, name });
};

export const addUserMutationFn = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: String;
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

// export const addToOrderServiceMutationFn = async ({ cartItems }: { cartItems: CartItemType[] }) => {
//   return request(`${GRAPHQL_API_URL}`, addToOrderService, { cartItems });
// }

export const addToOrderServiceMutationFn = async ({
  paymentIntent,
}: {
  paymentIntent: PaymentIntentType;
}) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/order_service`, paymentIntent);
};
