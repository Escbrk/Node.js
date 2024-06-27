import { v2 as cloudinary } from 'cloudinary';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../constants/index.js';
import fs from 'node:fs/promises';

cloudinary.config({
  cloud_name: env(ENV_VARS.CLAUDINARY.CLOUD_NAME),
  api_key: env(ENV_VARS.CLAUDINARY.API_KEY),
  api_secret: env(ENV_VARS.CLAUDINARY.API_SECRET),
});

export const saveToClaudinary = async (file) => {

  const res = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);

  return res.secure_url;
};
