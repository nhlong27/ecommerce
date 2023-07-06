import { request, gql } from 'graphql-request'
import { GRAPHQL_API_URL } from '@/constants/urls'


const updateUser = gql`
  mutation updateUser($email: String!, $name: String!) {
    updateUser(email: $email, name: $name) {
      id
      name
      email
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
