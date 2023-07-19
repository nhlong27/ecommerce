import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum Role {
    USER
    ADMIN
  }

  type Book {
    title: String!
  }

  type Rating {
    rate: Float
    count: Int
  }

  input RatingInput {
    rate: Float
    count: Int
  }

  type Product {
    title: String!
    price: Float
    description: String
    category: String
    image: String
    rating: Rating
  }

  input ProductInput {
    title: String!
    price: Float
    description: String
    category: String
    image: String
    rating: RatingInput
  }

  type Query {
    users: [User]
    products: [Product]
    stripe_secret: String
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

  type ReturnedUser {
    id: ID!
    name: String
    email: String!
    emailVerified: Boolean
    image: String
    role: Role
  }

  type Mutation {
    updateUser(email: String!, name: String!): User
    addUser(name: String!, email: String!, password: String!): ReturnedUser
    addShit(test: String): String
  }
`;
