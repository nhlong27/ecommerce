
import { useQuery } from '@tanstack/react-query';
import { getUsersQuery } from '../queries';
import { useSession } from 'next-auth/react';

export const useGetUsersQuery = () => {
  const { data: session } = useSession()
  const { data, error } = useQuery({
    ...getUsersQuery(),
    enabled: !!session?.user,
  })
  return { data, error, session }
}