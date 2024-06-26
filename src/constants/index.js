import path from 'node:path';

export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',

  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',

  JWT_SECRET: 'JWT_SECRET',

  HOST: {
    FRONTEND_HOST: 'FRONTEND_HOST',
    BACKEND_HOST: 'BACKEND_HOST',
  },

  CLAUDINARY: {
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
  },
};

export const TOKENS_PERION = {
  FIFTEEN_MINUTES: Date.now() + 15 * 60 * 1000, // 15 mins
  SEVEN_DAYS: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
};

export const ROLES = {
  TEACHER: 'teacher',
  PARENT: 'parent',
};

export const DIRECTORIES = {
  TEMPLATE_DIR: path.join(process.cwd(), 'src', 'templates'),
  TEMP_UPLOAD_DIR: path.join(process.cwd(), 'temp'),
  UPLOAD_DIR: path.join(process.cwd(), 'upload'),
};

export const IS_CLOUDINARY_ENABLED = 'IS_CLOUDINARY_ENABLED';
