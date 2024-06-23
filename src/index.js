import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

(async () => {
  await initMongoConnection();
  startServer();
})();

// const bootstrap = async () => {
//   await initMongoConnection();
//   startServer();
// };
// bootstrap();
