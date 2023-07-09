import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';
import axios from 'axios';

// const products = gql`
//   {
//     products {
//       title
//       price
//       description
//       category
//       image
//       rating {
//         rate
//         count
//       }
//     }
//   }
// `;

// export const getProductsQuery = () => {
//   return {
//     queryKey: ['products'],
//     queryFn: async () => request(`${GRAPHQL_API_URL}`, products),

//     refetchOnReconnect: false,
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//   };
// };
export const getProductsQuery = () => {
  return {
    queryKey: ['products'],
    queryFn: async () => ({ products: (await axios.get(`/products.json`)).data }),
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };
};
