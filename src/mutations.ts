import { request, gql } from 'graphql-request'
import { GRAPHQL_API_URL } from './constants/urls'

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
