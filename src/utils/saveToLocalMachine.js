import fs from 'node:fs/promises';
import path from 'node:path';
import { DIRECTORIES, ENV_VARS } from '../constants/index.js';
import { env } from './env.js';

export const saveToLocalMachine = async (file) => {
  const content = await fs.readFile(file.path);
  const newPath = path.join(DIRECTORIES.UPLOAD_DIR, file.filename);
  await fs.writeFile(newPath, content);
  await fs.unlink(file.path);

  return env(ENV_VARS.HOST.BACKEND_HOST) + `uploads/${file.filename}`;
};
