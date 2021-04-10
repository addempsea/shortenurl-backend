/* eslint-disable no-unused-vars */
/* eslint-disable max-lines-per-function */
import { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import config from './env';
import routes from '../app/routes/v1';
import { constants, helpers } from '../app/utils';

const { WELCOME, v1 } = constants;
const {
  ResponseHelper: { errorResponse },
  errorHelper: { notFoundApi }
} = helpers;

const port = config.PORT || 3000;

const appConfig = async (app, server) => {
  app.use(json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined', { stream: logger.stream }));

  server.applyMiddleware({ app, path: '/graphiql' });
  app.use('/', routes);

  app.use((req, res, next) => {
    next(notFoundApi);
  });
  app.use((err, req, res, next) => errorResponse(req, res, err));

  app.listen({ port }, () => {
    logger.info(`🚀🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

export default appConfig;
