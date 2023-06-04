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

export const getUsers = async () => {
  return await request(`${GRAPHQL_API_URL}`, users)
}

export const getUsersQuery = () => {
  return {
    queryKey: ['users'],
    queryFn: getUsers,
  }
}
