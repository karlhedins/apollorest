const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const StarwarsApi = require("./StarwarsApi");
const genreRouter = require("./genreRouter");
const genreFinder = require("./genreFinder");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  """
  An individual person or character within the Star Wars universe.
  """
  type Person {
    """
    The name of this person.
    """
    name: String

    """
    The gender of this person. Either "Male", "Female" or "unknown",
    "n/a" if the person does not have a gender.
    """
    gender: String
  }

  type Genre {
    id: String
    genre: String
  }

  type Query {
    hello: String
    starwarsPerson(id: ID!): Person
    findGenre(genre: String): Genre
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    starwarsPerson: async (_source, { id }, { dataSources }) => {
      return dataSources.starwarsApi.getStarwarsPerson(id);
    },
    findGenre: async (_source, { genre }, context) => {
      return genreFinder(genre);
    },
    // NOTE: Auth - 3. Get user from context
    // findGenre: async (_source, { genre }, { user }) => {
    //   return genreFinder(genre);
    // },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      starwarsApi: new StarwarsApi(),
    };
  },
  // NOTE: Auth - 2. Apollo context
  // Here we can extract the user from the request object.
  // and make it available to the Apollo context
  // context: ({ req }) => ({ user: req.user }),
});

const app = express();

// Register express routers
app.use("/genre", genreRouter);

// NOTE: Auth - 1. middleware
// Mount a jwt or other auth middleware that is run before the GraphQL execution
// This middleware could for instance put a user object on the incoming request
// app.use(path, jwtCheckMiddleware);

// Connect express and apollo;
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(
    `🚀 GraphQl server ready at http://localhost:4000${server.graphqlPath}`
  );
  console.log(`REST endpoint ready at http://localhost:4000/genre`);
});
