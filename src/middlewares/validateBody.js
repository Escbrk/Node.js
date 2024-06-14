import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
      convert: false,
    });
    next();
  } catch (err) {
    const errors = err.details.map((error) => error.message);

    next(
      createHttpError(400, 'Bad request', {
        error: errors,
      }),
    );
  }
};
