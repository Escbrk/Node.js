export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

export const TOKENS_PERION = {
  FIFTEEN_MINUTES:Date.now() + 15 * 60 * 1000, // 15 mins
  SEVEN_DAYS: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
};

export const ROLES = {
  TEACHER: 'teacher',
  PARENT: 'parent',
};

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};
