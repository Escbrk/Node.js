export const errorHandlerMiddleware = (error, req, res) => {
  res.status(500).send(error.message);
};
