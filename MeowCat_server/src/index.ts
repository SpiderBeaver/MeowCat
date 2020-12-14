import express from 'express';
import cors from 'cors';
import { createConnection, DeepPartial } from 'typeorm';
import Post from './entity/Post';
import User from './entity/User';

const app = express();
app.use(express.json());
const corsMiddleware = cors();
app.use(corsMiddleware);

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

  app.listen(8000, () => {
    console.log('Server started');
  });
};

main();
