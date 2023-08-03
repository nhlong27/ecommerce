import { useQuery } from '@tanstack/react-query';
import { getUserQuery } from '../queries';
import { useSession } from 'next-auth/react';

export const useGetUserQuery = (email: string) => {
  const { data, error } = useQuery({
    ...getUserQuery(email),
    enabled: !!email,
  });
  return { data, error };
};
