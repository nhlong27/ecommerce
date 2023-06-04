import {gql} from 'graphql-tag'

export const typeDefs = gql`
  enum Role {
    USER 
    ADMIN
  }

  type User {
    id: ID!
    name: String 
    email: String! 
    emailVerified: Boolean
    image: String
    password: String
    role: Role 
  }

  type Query {
    users: [User]
  }

`;
