import express from 'express';
import cors from 'cors';
// TODO: Think about a default .env file to commit to the repo.
import dotenv from 'dotenv';

import { createConnection } from 'typeorm';
import router from './router';

const app = express();
app.use(express.json());
const corsMiddleware = cors();
app.use(corsMiddleware);

dotenv.config();

const main = async () => {
  await createConnection();
  app.use(router);

  app.listen(8000, () => {
    console.log('Server started');
  });
};

main();
