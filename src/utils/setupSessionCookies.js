import { TOKENS_PERION } from '../constants/index.js';

export const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    expire: TOKENS_PERION.DAYS_7,
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    expire: TOKENS_PERION.DAYS_7,
  });
};
