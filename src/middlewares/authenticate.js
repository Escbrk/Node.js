import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {

  try {
      const header = req.get('Authorization');
  if (!header) next(createHttpError(401, 'Auth header is not provided'));

  const [bearer, token] = header.split(' ');

  if (bearer !== 'Bearer' || !token)
    next(createHttpError(401, 'Auth header should be of bearer type!'));

  const session = await Session.findOne({ accessToken: token });

  if (!session) next(createHttpError(401, 'Session not found!'));

  if (Date.now() > session.accessTokenValidUntil)
    next(createHttpError(401, 'Token is expired!'));

  const user = await User.findById(session.userId);
  if (!user)
    next(
      createHttpError(401, 'User associated with this session is not found'),
    );

  req.user = user;
  next();
  } catch (error) {
    next(error)
  }

};
