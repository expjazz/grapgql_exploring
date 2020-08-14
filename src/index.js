
const { PrismaClient } = require('@prisma/client');

const { GraphQLServer } = require('graphql-yoga'); const Query = require('./resolvers/Query');

const resolvers = {
  Query,
};

const prisma = new PrismaClient();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request, prisma,
  }),
});

// The `listen` method launches a web server.
server.start((deets) => console.log(`server is running on ${deets.port}`));