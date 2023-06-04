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

  type Book {
    title: String!
  }

  type Query {
    users: [User]
    books: [Book]
  }

  type Mutation {
    updateUser(email: String!, name: String!): User
    addBook(title: String!): Book
  }
`;
