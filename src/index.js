import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/uploadDir.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
  } catch (err) {
    console.error('❌ Error during initialization:', err);
    process.exit(1);
  }
};

bootstrap();
