import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

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
    res.status(404).send('Oops! Route was not found!');
  });

  app.use((error, req, res) => {
    res.status(500).send(error.message);
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000!');
  });
};
