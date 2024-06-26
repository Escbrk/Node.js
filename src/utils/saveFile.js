import { IS_CLOUDINARY_ENABLED } from '../constants/index.js';
import { env } from './env.js';
import { saveToClaudinary } from './saveToClaudinary.js';
import { saveToLocalMachine } from './saveToLocalMachine.js';

export const saveFile = async (file) => {
  let url;
  if (env(IS_CLOUDINARY_ENABLED) === 'true') {
    url = await saveToClaudinary(file);
  } else {
    url = await saveToLocalMachine(file);
  }

  return url;
};
