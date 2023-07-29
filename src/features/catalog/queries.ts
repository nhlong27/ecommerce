import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';
import axios from 'axios';
import { CartItemsSchema, ProductSchema, ProductsSchema } from './types';
import { ProductDocument } from '../../../mongoose/models/product.model';

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

const product = gql`
  query product($sku: String!) {
    product (sku: $sku) {
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

const cartItems = gql`
  query cartItems($email: String!) {
    cartItems (email: $email) {
      id
      userId
      productId
      productTitle
      productPrice
      productCategory
      productSize
      productImage
      productQuantity
      quantity
    }
  }
`;


export const getProductsQuery = () => {
  return {
    queryKey: ['products'],
    queryFn: async () => {
      const response = await request(`${GRAPHQL_API_URL}`, products);
      return ProductsSchema.parse(response);
    },
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };
};

export const getProductQuery = (sku: string) => {
  return {
    queryKey: ['product', sku],
    queryFn: async () => {
      const response = await request(`${GRAPHQL_API_URL}`, product, { sku });
      return ProductSchema.parse((response as Record<'product', any>).product);
    },
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };
};

export const getCartItemsQuery = (email: string) => {
  return {
    queryKey: ['cartItems'],
    queryFn: async () => {
      const response = await request(`${GRAPHQL_API_URL}`, cartItems, { email });
      return CartItemsSchema.parse(response);
    },
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  };
}