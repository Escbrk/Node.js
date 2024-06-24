import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Session } from '../db/models/session.js';
import { SMTP, TOKENS_PERION } from '../constants/index.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';

const createSession = () => {
  return {
    accessToken: randomBytes(40).toString('base64'),
    refreshToken: randomBytes(40).toString('base64'),
    accessTokenValidUntil: Date.now() + TOKENS_PERION.FIFTEEN_MINUTES,
    refreshTokenValidUntil: Date.now() + TOKENS_PERION.SEVEN_DAYS,
  };
}

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.findOne({ email: payload.email });

  if (user)
    throw createHttpError(409, 'User with this email is already in database');

  return await User.create({ ...payload, password: hashedPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found!');

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) throw createHttpError(401, 'Unautorized');

  await Session.deleteOne({ userId: user.id });

  return await Session.create({
    userId: user.id,
    ...createSession(),
  });
};

export const refreshSession = async ({ res, sessionId, sessionToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
  if (!session) throw createHttpError(401, 'Session not found!');

  if (Date.now() > session.refreshTokenValidUntil) {
    res.clearCookie('sessionId');
    res.clearCookie('sessionToken');

    throw createHttpError(401, 'Refresh token is expired!');
  }

  const user = await User.findById(session.userId);
  if (!user) throw createHttpError(401, 'Session not found!');

  await Session.deleteOne({ _id: sessionId });

  return await Session.create({
    userId: user.id,
    ...createSession(),
  });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found!');

  const resetToken = jwt.sign({
    sub: user._id,
    email,
  }, {
    // env('JWT_SECRET'),
  }, {
    expiresIn: '15m'
  });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetToken}">here</a> to reset your password</p>`
  })

};
