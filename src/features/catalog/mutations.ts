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
  mutation addToCart($productId: String!, $quantity: Int!, $productImage: String, $email: String!, $productTitle: String, $productPrice: Float, $productCategory: String, $productSize: String, $productQuantity: String) {
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


export const addProductMutationFn = async (product: any) => {
  return request(`${GRAPHQL_API_URL}`, addProduct, { ...product });
};

export const addToCartMutationFn = async (cartItem: addToCartType) => {
  return request(`${GRAPHQL_API_URL}`, addToCart, { ...cartItem });
}
