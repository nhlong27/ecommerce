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

  type CartItem {
    id: ID!
    userId: Int!
    productId: String!
    productTitle: String
    productPrice: Float
    productCategory: String
    productSize: String
    productImage: String
    productQuantity: String
    quantity: Int!
  }

  type Order {
    id: ID!
    userId: Int!

    total: Int
    status: String
    orderItems: [OrderItem]

  }

  type OrderItem {
    id: ID!
    orderId: Int!

    status: String

    productId: String!
    productTitle: String
    productPrice: Float
    productCategory: String
    productSize: String
    productImage: String
    productQuantity: String
    quantity: Int!
  }

  type PaymentDetails {
    id: ID!
    userId: Int!

    paymentMethod: String
    paymentAmount: String
  }

  type User {
    id: ID!
    name: String
    email: String!
    emailVerified: Boolean
    image: String
    password: String

    cartItems: [CartItem]
    orders: [Order]
    paymentDetails: [PaymentDetails]

    role: Role
  }

  type ReturnedUser {
    id: ID!
    name: String
    email: String!
    emailVerified: Boolean
    image: String

    cartItems: [CartItem]
    orders: [Order]
    paymentDetails: [PaymentDetails]

    role: Role
  }

  type Query {
    product(sku: String!): Product
    products: [Product]
    stripe_secret: String
    cartItems (
      email: String!
    ): [CartItem]
  }

  type Mutation {
    updateUser(
      email: String!
      name: String!
    ): User
    addUser(
      name: String!,
      email: String!
      password: String!
    ): ReturnedUser
    addToCart(
      email: String!
      productId: String!
      productTitle: String
      productPrice: Float
      productCategory: String
      productSize: String
      productImage: String
      productQuantity: String
      quantity: Int!
    ): CartItem
  }
`;
