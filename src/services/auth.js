import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Session } from '../db/models/session.js';

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'User with this email is already in database');
  }

  return await User.create({ ...payload, password: hashedPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found!');

  const areEqual = await bcrypt.compare(password, user.password);
  if (!areEqual) throw createHttpError(401, 'Unautorized');

  await Session.deleteOne({ userId: user.id });

  const accessToken = crypto.randomBytes(40).toString('base64');
  const refreshToken = crypto.randomBytes(40).toString('base64');

  return await Session.create({
    accessToken,
    refreshToken,
    userId: user.id,
    accessTokenValidUntil: Date.now() + 1000 * 60 * 15, // 15 mins
    refreshTokenValidUntil: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};
