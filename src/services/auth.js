import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Session } from '../db/models/session.js';
import { ENV_VARS, TOKENS_PERION } from '../constants/index.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';

const createSession = () => {
  return {
    accessToken: randomBytes(40).toString('base64'),
    refreshToken: randomBytes(40).toString('base64'),
    accessTokenValidUntil: TOKENS_PERION.FIFTEEN_MINUTES,
    refreshTokenValidUntil: TOKENS_PERION.SEVEN_DAYS,
  };
};

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

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '5m',
    },
  );

  try {
    await sendEmail({
      from: env(ENV_VARS.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html: `
          <h1>Hello!</h1>
          <p>Click <a href="${env(
            ENV_VARS.FRONTEND_HOST,
          )}/reset-password?token=${resetToken}}">here</a> to reset your password</p>
                `,
    });
  } catch (err) {
    console.log(err);

    throw createHttpError(500, 'Problem with sending emails');
  }
};

export const resetPassword = async ({ token, password }) => {
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, env(ENV_VARS.JWT_SECRET));
  } catch (error) {
    throw createHttpError(401, error.message);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    {
      _id: tokenPayload.sub,
      email: tokenPayload.email,
    },
    { password: hashedPassword },
  );
};
