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

    orderId: Int!
    amount_total: Float
    currency: String
    status: String
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

  type Review {
    id: ID!
    userId: Int
    userEmail: String
    productId: String
    rating: Int
    description: String
  }

  type ReturnedProduct {
    products: [Product]
    count: Int
  }

  type Query {
    product(sku: String!): Product
    products (category: String!, brand: String, price: Float, sortBy: String, pageIndex: Int!, keyword: String): ReturnedProduct
    cartItems (
      email: String!
    ): [CartItem]
    order (
      orderId: String!
    ): Order
    orders (
      email: String!
    ): [Order]
    paymentDetails (
      email: String!
    ): [PaymentDetails]
    user (email: String!): User
    reviews (productId: String!): [Review]
  }

  type Mutation {
    updateUser(
      email: String!
      name: String!
      password: String!
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
    addReview(
      productId: String!
      userEmail: String!
      rating: Int!
      description: String!
    ): Review
    updateProduct (
      productId: String!
      score: Float!
      n_o_reviews: Int!
    ) : Product
    deleteCartItem (
      id: String!
    ) : CartItem
  }
`;
