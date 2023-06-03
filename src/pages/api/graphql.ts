import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {gql} from 'graphql-tag'

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const typeDefs = gql`#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// export default async function handler(req: any, res: any) {
//   await startStandaloneServer(server, {
//     listen: { port: 3000 },
//   });
  
//   // await server.createHandler({ path: '/api/graphql' })(req, res)
// }

export default startServerAndCreateNextHandler(server)

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };