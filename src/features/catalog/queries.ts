import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';

const products = gql`
  {
    products {
      title
      price
      description
      category
      image
      rating {
        rate
        count
      }
    }
  }
`;

export const getProductsQuery = () => {
  return {
    queryKey: ['products'],
    queryFn: async () => request(`${GRAPHQL_API_URL}`, products),

    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };
};

