import { gql } from 'graphql-tag';

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
    books: [Book]
    products: [Product]
    stripe_secret: String
  }

  type Mutation {
    updateUser(email: String!, name: String!): User
    addBook(title: String!): Book
    addProduct(input: ProductInput): Product
  }
`;
