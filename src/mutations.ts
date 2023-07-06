import { request, gql } from 'graphql-request'
import { GRAPHQL_API_URL } from './constants/urls'
import { BookSchema, ProductType } from './types/types'

const updateUser = gql`
  mutation updateUser($email: String!, $name: String!) {
    updateUser(email: $email, name: $name) {
      id
      name
      email
    }
  }
`
const addBook = gql`
  mutation addBook($title: String!) {
    addBook(title: $title) {
      title
    }
  }
`
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

export const updateUserMutationFn = async ({
  email,
  name,
}: {
  email: string
  name: string
}) => {
  return request(`${GRAPHQL_API_URL}`, updateUser, { email, name })
}

export const addBookMutationFn = async ({ title }: { title: string }) => {
  return request(`${GRAPHQL_API_URL}`, addBook, { title })
}

export const addProductMutationFn = async (product: ProductType) => {
  return request(`${GRAPHQL_API_URL}`, addProduct, { ...product })
}
