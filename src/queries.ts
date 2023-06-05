import { request, gql } from 'graphql-request'
import { GRAPHQL_API_URL } from './constants/urls'
import { BooksSchema } from './types/types'

const users = gql`
  {
    users {
      id
      name
      email
    }
  }
`
const books = gql`
  {
    books {
      title
    }
  }
`
export const getUsersQuery = () => {
  return {
    queryKey: ['users'],
    queryFn: async () => request(`${GRAPHQL_API_URL}`, users),
  }
}
export const getBooksQuery = () => {
  return {
    queryKey: ['books'],
    queryFn: async () => request(`${GRAPHQL_API_URL}`, books),
  }
}
