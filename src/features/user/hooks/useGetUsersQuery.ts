
import { useQuery } from '@tanstack/react-query';
import { getUsersQuery } from '../queries';

export const useGetUsersQuery = () => {
  return useQuery({ ...getUsersQuery() });
};
