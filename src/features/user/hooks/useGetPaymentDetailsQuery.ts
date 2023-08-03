import { useQuery } from '@tanstack/react-query';
import { getPaymentDetailsQuery } from '../queries';

export const useGetPaymentDetailsQuery = (email: string) => {
  return useQuery({ ...getPaymentDetailsQuery(email), enabled: !!email });
};
