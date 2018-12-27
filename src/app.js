import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';
import chalk from 'chalk';

import schema from './apollo/schema';
import config from './config';
import { verifyJWT } from './utils';

const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function() { // eslint-disable-line
  return this.toString();
};

const app = express();

const PORT = process.env.PORT || 4000;
const MONGO_URI = config.DB_URI;

mongoose.Promise = global.Promise;

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useCreateIndex: true }
);

mongoose.connection
  .once('open', () => {
    console.log('Connected to MongoDB instance.'); // eslint-disable-line no-console
  })
  .on('error', error => console.log('Error connecting to MongoDB:', error)); // eslint-disable-line no-console

app.set('jwt-secret', config.SECRET);

app.use('*', cors());

app.use(compression());

const apolloConfig = {
  ...schema,
  introspection: true,
  playground: true,
  formatError: error => {
    console.log(error);
    return error;
  },
  context: async ({ req }) => {
    const token = req.headers.authorization
      ? req.headers.authorization.replace('Bearer ', '')
      : '';

    const publicOperation = ['login', 'register', 'IntrospectionQuery'];
    const { operationName } = req.body;
    const callback = (err, data) => {
      if (err) throw new AuthenticationError('Invalid token!');
      return data;
    };
    let user = null;
    if (token) {
      user = await verifyJWT(token, callback);
      console.log(
        chalk.cyan('AUTHORIZED OPERATION: ->'),
        chalk.green(operationName)
      );
    }
    if (!user && !publicOperation.includes(operationName)) {
      throw new AuthenticationError('Unauthorized access is denied!');
    }

    return {
      user,
      config,
    };
  },
  tracing: true,
};

const apolloServer = new ApolloServer(apolloConfig);

apolloServer.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
});
