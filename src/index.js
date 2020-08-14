
const { PrismaClient } = require('@prisma/client');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Curriculum = require('./resolvers/Curriculum');
const User = require('./resolvers/User');
require('dotenv').config();

const resolvers = {
  Query,
  Mutation,
  Curriculum,
  User,
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
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

// The `listen` method launches a web server.
server.start(opts, (deets) => console.log(`HA${process.env.APP_SECRET} HA`));