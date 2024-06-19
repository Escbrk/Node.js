export const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    expire: 7 * 24 * 60 * 60,
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    expire: 7 * 24 * 60 * 60,
  });
};
