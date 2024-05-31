import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';

dotenv.config();

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello world!');
  });

  app.get('/error', (req, res, next) => {
    next(new Error('some error here'));
  });

  app.use((req, res) => {
    res.status(404).send('Oops! Route was not found!');
  });

  app.use((error, req, res) => {
    res.status(500).send(error.message);
  });

  const PORT = env('PORT', 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
