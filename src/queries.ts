import { request, gql } from 'graphql-request'
import { GRAPHQL_API_URL } from './constants/urls'

const users = gql`
  {
    users {
      id
      name
      email
    }
  }
`


export const getUsersQuery = () => {
  return {
    queryKey: ['users'],
    queryFn:  async () => request(`${GRAPHQL_API_URL}`, users),
  }
}
