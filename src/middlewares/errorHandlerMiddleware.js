import { isHttpError } from 'http-errors';

export const errorHandlerMiddleware = (err, req, res, next) => {
  // if (err instanceof HttpError) {
  if (isHttpError(err)) {
    const statusCode = err.status;

    return res.status(statusCode).json({
      status: statusCode,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 500,
    message: 'Interlan server error',
    data: {
      message: err.message,
    },
  });
};
