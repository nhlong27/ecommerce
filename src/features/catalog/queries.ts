import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';
import { CartItemsSchema, ProductSchema, ProductsSchema, ReviewSchema } from './types';
import {z} from 'zod'

const products = gql`
  query products($category: String!, $brand: String, $price: Float, $sortBy: String, $pageIndex: Int!, $keyword: String) {
    products (category: $category, brand: $brand, price: $price, sortBy: $sortBy, pageIndex: $pageIndex, keyword: $keyword) {
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
      count
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

const reviews = gql`
  query reviews($productId: String!) {
    reviews (productId: $productId) {
      id
      userId
      userEmail
      productId
      rating
      description
    }
  }
`;


export const getProductsQuery = (pageIndex: number, category: string, brand?: string, price?:number, sortBy?: string, keyword?: string) => {
  return {
    queryKey: ['products', `${pageIndex+category+brand+price+sortBy+keyword}`],
    queryFn: async () => {
      const response = await request(`${GRAPHQL_API_URL}`, products, { category, brand, price, sortBy, pageIndex, keyword });
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

export const getReviewsQuery = (productId: string) => {
  return {
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await request(`${GRAPHQL_API_URL}`, reviews, { productId });
      return z.object({reviews: z.array(ReviewSchema)}).parse(response);
    },
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  };
}