import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';
import axios from 'axios';
import { ProductsSchema } from './types';

const products = gql`
  {
    products {
      sku
      title
      quantity
      size
      image
      category
      price
      score
      n_o_reviews
      instock_reserved
      instock_available
    }
  }
`;

export const getProductsQuery = () => {
  return {
    queryKey: ['products'],
    queryFn: async () => {
      const response = await request(`${GRAPHQL_API_URL}`, products)
      return ProductsSchema.parse(response)
    },
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };
};
// export const getProductsQuery = () => {
//   return {
//     queryKey: ['products'],
//     queryFn: async () => ({
//       products: (await axios.get(`/products.json`)).data,
//     }),
    // queryFn: async () => ({
    //   products: (await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/scrape`)).data,
    // }),
//     refetchOnReconnect: false,
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//   };
// };
