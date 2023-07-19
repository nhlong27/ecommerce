import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';
import { useMutation } from '@tanstack/react-query';

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
