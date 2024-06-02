import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(express.json());
  app.use(cors());

  // app.use('*', (req, res, next) => {
  //   console.log(`Login time: ${new Date().toLocaleString()}`);
  //   next();
  // });

  app.get('/', (req, res) => {
    // res.send('Hello world!');
    res.json({
      message: 'Hello World!',
    });
  });

  app.get('/error', (req, res, next) => {
    next(new Error('some error here'));
  });

  app.use('*', notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = Number(env(ENV_VARS.PORT, 3000));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
    console.log(`Login time: ${new Date().toLocaleString()}`);
  });
};
