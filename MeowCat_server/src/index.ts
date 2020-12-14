import express from 'express';
import { createConnection, DeepPartial } from 'typeorm';
import { User } from './entity/User';

const app = express();
app.use(express.json());

const main = async () => {
  const connection = await createConnection();

  app.get('/users', async (req, res) => {
    const userRepository = connection.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const userRepository = connection.getRepository(User);
    const newUser = userRepository.create(req.body);
    const result = userRepository.save(newUser);
    res.send(result);
  });

  app.listen(8000, () => {
    console.log('Server started');
  });
};

main();
