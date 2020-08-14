
const { PrismaClient } = require('@prisma/client');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { GraphQLServer } = require('graphql-yoga'); const Query = require('./resolvers/Query');

const resolvers = {
  Query,
};

const opts = {
  cors: {
    credentials: true,
    origin: ['http://localhost:3000'],
  },
};

const prisma = new PrismaClient();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request, prisma,
  }),
});

server.express.use(cookieParser());
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, APP_SECRET);
    req.userId = userId;
  }
  next();
});

// The `listen` method launches a web server.
server.start(opts, (deets) => console.log(`server is running on ${deets.port}`));