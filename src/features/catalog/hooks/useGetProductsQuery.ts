
import { useQuery } from '@tanstack/react-query';
import { getProductsQuery } from '../queries';

export const useGetProductsQuery = () => {
  return useQuery({ ...getProductsQuery() });
};
