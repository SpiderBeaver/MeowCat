import express from 'express';
import cors from 'cors';
// TODO: Think about a default .env file to commit to the repo.
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createConnection, DeepPartial } from 'typeorm';
import Post from './entity/Post';
import User from './entity/User';

const app = express();
app.use(express.json());
const corsMiddleware = cors();
app.use(corsMiddleware);

dotenv.config();

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

  app.get('/posts', async (req, res) => {
    const postsRepository = connection.getRepository(Post);
    const posts = await postsRepository.find();
    res.json(posts);
  });

  app.post('/posts', async (req, res) => {
    try {
      const postsRepository = connection.getRepository(Post);
      const newPost = postsRepository.create(req.body);
      const result = await postsRepository.save(newPost);
      res.send(result);
    } catch (e) {
      // TODO: Should not send the exception. It has too many implementation details.
      res.status(400).send(e);
    }
  });

  app.post('/login', async (req, res) => {
    const { username, password }: { username: string; password: string } = req.body;
    const usersRepository = connection.getRepository(User);
    const user = await usersRepository.findOne({ where: { username: username, password: password } });
    if (user) {
      const token = jwt.sign({ username: username }, process.env.JWT_SECRET!);
      res.send(token);
    } else {
      res.status(401).send('Incorrect credentials.');
    }
  });

  app.listen(8000, () => {
    console.log('Server started');
  });
};

main();
