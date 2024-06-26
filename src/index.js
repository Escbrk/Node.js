import { DIRECTORIES } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';
import { createFolderIfDesntExist } from './utils/createFolderIfDesntExist.js';

(async () => {
  await initMongoConnection();
  await createFolderIfDesntExist(DIRECTORIES.TEMP_UPLOAD_DIR);
  await createFolderIfDesntExist(DIRECTORIES.UPLOAD_DIR);
  startServer();
})();

// const bootstrap = async () => {
//   await initMongoConnection();
//   startServer();
// };
// bootstrap();
