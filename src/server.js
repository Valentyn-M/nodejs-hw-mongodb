import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/env.js';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar(ENV_VARS.PORT, 3000));

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // ==========================================================================================================================

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Contacts App!',
    });
  });

  app.use(contactsRouter);

  // ==========================================================================================================================

  app.use('*', notFoundHandler);

  app.use(errorHandler);
};
