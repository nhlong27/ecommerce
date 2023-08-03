import { useQuery } from '@tanstack/react-query';
import { getReviewsQuery } from '../queries';

export const useGetReviewsQuery = (productId: string) => {
  return useQuery({ ...getReviewsQuery(productId), enabled: !!productId });
};
