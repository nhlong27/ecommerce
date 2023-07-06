import { request, gql } from 'graphql-request'
import { GRAPHQL_API_URL } from '@/constants/urls'
import {  ProductType } from '@/types/types'

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
`

export const addProductMutationFn = async (product: ProductType) => {
  return request(`${GRAPHQL_API_URL}`, addProduct, { ...product })
}
