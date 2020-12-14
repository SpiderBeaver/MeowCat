import express from 'express';
import { createConnection } from 'typeorm';

const app = express();

const main = async () => {
  const connection = await createConnection();

  app.get('/test', (req, res) => {
    res.send("You're good");
  });

  app.listen(8000, () => {
    console.log('Server started');
  });
};

main();
