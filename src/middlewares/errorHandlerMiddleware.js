import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.status;

  if (isHttpError(err)) {
    return res.status(statusCode).json({
      status: statusCode,
      message: err.message,
    });
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'Mongoose error',
      data: {
        message: err.message,
      },
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Internal server error',
    data: {
      message: err.message,
    },
  });
};
