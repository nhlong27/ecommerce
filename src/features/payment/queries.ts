import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';

const stripe_secret = gql`
  {
    stripe_secret
  }
`;

export const getStripeSession = (shouldGetSecret: boolean) => {
  return {
    queryKey: ['clientSecret'],
    queryFn: async () => request(`${GRAPHQL_API_URL}`, stripe_secret),
    enabled: !!shouldGetSecret,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  };
};
