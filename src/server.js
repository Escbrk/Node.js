import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { DIRECTORIES, ENV_VARS } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import rootRouter from './routers/index.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export const startServer = () => {
  const app = express();

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use(
    express.json({
      // limit: '1mb', //default is 100kb
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use('/uploads', express.static(DIRECTORIES.UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());

  app.use(cors());
  app.use(cookieParser());

  app.use(rootRouter);

  app.use('*', notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = Number(env(ENV_VARS.PORT, 3000));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
    console.log(`Login time: ${new Date().toLocaleString()}`);
  });
};
