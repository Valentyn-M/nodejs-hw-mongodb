import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/env.js';
import cors from 'cors';
import pino from 'pino-http';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/uploadDir.js';

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

  app.use(cookieParser());

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

  app.use(router);

  app.use('/uploads', express.static(UPLOAD_DIR));

  // ==========================================================================================================================

  app.use('*', notFoundHandler);

  app.use(errorHandler);
};
