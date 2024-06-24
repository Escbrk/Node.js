import { TOKENS_PERION } from '../constants/index.js';

export const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    expire: Date.now() + TOKENS_PERION.SEVEN_DAYS,
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    expire: Date.now() + TOKENS_PERION.SEVEN_DAYS,
  });
};
