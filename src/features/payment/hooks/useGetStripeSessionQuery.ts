import { useQuery } from '@tanstack/react-query';
import { getStripeSession } from '../queries';

export const useGetStripeSessionQuery = (shouldGetSecret = true) => {
  return useQuery({ ...getStripeSession(shouldGetSecret) });
};
