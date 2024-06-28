import { OAuth2Client } from 'google-auth-library';
import { env } from './env.js';
import { ENV_VARS } from '../constants/index.js';
import fs from 'node:fs';
import path from 'node:path';
import createHttpError from 'http-errors';

const googleConfig = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'google-oauth.json').toString()),
);
const client = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_AUTH.CLIENT_ID),
  clientSecret: env(ENV_VARS.GOOGLE_AUTH.CLIENT_SECRET),
  project_id: env(ENV_VARS.GOOGLE_AUTH.PROJECT_ID),
  redirectUri: googleConfig.web.redirect_uris[0],
});

export const generateOAuthURL = () =>
  client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateGoogleOAuthCode = async (code) => {
  try {
    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;

    if (!idToken) throw createHttpError(401);
    return client.verifyIdToken({ idToken });
    
  } catch (err) {
    console.log(err);
    throw createHttpError(500, 'Error during google OAuth authorization');
  }
};
