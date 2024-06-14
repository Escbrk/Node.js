import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoId =
  (nameId = 'id') =>
  (req, res, next) => {
    const id = req.params[nameId];

    if (!id) {
      throw new Error('ID in validateMongoId is not provided');
    }

    if (!isValidObjectId(id)) {
      return next(createHttpError(400, 'Invalid ID'));
    }

    return next();
  };
