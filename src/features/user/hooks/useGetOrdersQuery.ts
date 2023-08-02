import { useQuery } from '@tanstack/react-query';
import { getOrdersQuery } from '../queries';

export const useGetOrdersQuery = (email: string) => {
  return useQuery({ ...getOrdersQuery(email) });
};
