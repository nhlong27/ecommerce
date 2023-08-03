import { request, gql } from 'graphql-request';
import { GRAPHQL_API_URL } from '@/constants/urls';
import { addToCartType } from './types';

const addProduct = gql`
  mutation addProduct(
    $title: String!
    $price: Float
    $description: String
    $category: String
    $image: String
    $rating: RatingInput
  ) {
    addProduct(
      input: {
        title: $title
        price: $price
        description: $description
        category: $category
        image: $image
        rating: $rating
      }
    ) {
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

const addToCart = gql`
  mutation addToCart(
    $productId: String!
    $quantity: Int!
    $productImage: String
    $email: String!
    $productTitle: String
    $productPrice: Float
    $productCategory: String
    $productSize: String
    $productQuantity: String
  ) {
    addToCart(
      productId: $productId
      quantity: $quantity
      productImage: $productImage
      email: $email
      productTitle: $productTitle
      productPrice: $productPrice
      productCategory: $productCategory
      productSize: $productSize
      productQuantity: $productQuantity
    ) {
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

const addReview = gql`
  mutation addReview(
    $productId: String!
    $userEmail: String!
    $rating: Int!
    $description: String!
  ) {
    addReview(
      productId: $productId
      userEmail: $userEmail
      rating: $rating
      description: $description
    ) {
      id
      userId
      userEmail
      productId
      rating
      description
    }
  }
`;

const updateProduct = gql`
  mutation updateProduct (
    $productId: String!
    $score: Float!
    $n_o_reviews: Int!
  ) {
    updateProduct(
      productId: $productId
      score: $score
      n_o_reviews: $n_o_reviews
    ) {
      id
      title
      size
      quantity
      sku
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

export const addProductMutationFn = async (product: any) => {
  return request(`${GRAPHQL_API_URL}`, addProduct, { ...product });
};

export const addToCartMutationFn = async (cartItem: addToCartType) => {
  return request(`${GRAPHQL_API_URL}`, addToCart, { ...cartItem });
};

export const addReviewMutationFn = async (review: any) => {
  return request(`${GRAPHQL_API_URL}`, addReview, { ...review });
};

export const updateProductMutationFn = async (product: any) => {
  return request(`${GRAPHQL_API_URL}`, updateProduct, { ...product });
}