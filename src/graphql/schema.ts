import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum Role {
    USER
    ADMIN
  }

  type Product {
    id: ID!
    title: String!
    size: String
    quantity: String
    sku: String!
    image: String
    category: String
    price: Float
    score: Float
    n_o_reviews: Int
    instock_reserved: Int
    instock_available: Int
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

  type Query {
    products: [Product]
    stripe_secret: String
  }

  type Mutation {
    updateUser(email: String!, name: String!): User
    addUser(name: String!, email: String!, password: String!): ReturnedUser
  }
`;
