
import { useQuery } from '@tanstack/react-query';
import { getProductQuery } from '../queries';

export const useGetProductQuery = (sku: string) => {
  return useQuery({ ...getProductQuery(sku) });
};
