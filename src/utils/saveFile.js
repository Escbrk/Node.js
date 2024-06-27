import { ENV_VARS } from '../constants/index.js';
import { env } from './env.js';
import { saveToClaudinary } from './saveToClaudinary.js';
import { saveToLocalMachine } from './saveToLocalMachine.js';

export const saveFile = async (file) => {
  if (!file) return;

  // let url;
  // if (env(ENV_VARS.CLAUDINARY.IS_CLOUDINARY_ENABLED) === 'true') {
  //   url = await saveToClaudinary(file);
  // } else {
  //   url = await saveToLocalMachine(file);
  // }
  // return url

  return env(ENV_VARS.CLAUDINARY.IS_CLOUDINARY_ENABLED) === 'true'
      ? await saveToClaudinary(file)
      : await saveToLocalMachine(file);

};
