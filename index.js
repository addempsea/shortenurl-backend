import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './app/graphql';
import Logger from './config/logger';
import { appConfig } from './config';

global.logger = Logger.createLogger({ label: 'BACKDROP_BACKEND' });
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

appConfig(app, server);

export default app;
