import { useQuery } from '@tanstack/react-query';
import { getProductsQuery } from '../queries';

export const useGetProductsQuery = (
  pageIndex: number,
  category: string,
  brand?: string,
  price?: number,
  sortBy?: string,
  keyword?: string,
) => {
  return useQuery({ ...getProductsQuery(pageIndex, category, brand, price, sortBy, keyword) });
};
