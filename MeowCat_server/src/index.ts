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

  app.get('/me', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    // TODO: Create a type for jwt data.
    // TODO: Handle errors
    const decodedJwt = <any>(jwt.verify(token!, process.env.JWT_SECRET!));
    const userId = decodedJwt.userId;
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne(userId);    
    if (user == undefined) {
      return res.send({
        error: "Incorrect token"
      })
    }
    res.send({
      id: user.id,
      username: user.username
    });
  });

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
      const token = req.headers.authorization?.split(' ')[1];
      const tokenData = <any>jwt.verify(token!, process.env.JWT_SECRET!);
      const userId = tokenData.userId;
      const newPostText = req.body.text;

      const postsRepository = connection.getRepository(Post);
      const newPost = postsRepository.create({ text: newPostText, user: { id: userId }});
      const result = await postsRepository.save(newPost);
      res.send(result);
    } catch (e) {
      return res.status(400).send();
    }
  });

  app.post('/login', async (req, res) => {
    const { username, password }: { username: string; password: string } = req.body;
    const usersRepository = connection.getRepository(User);
    const user = await usersRepository.findOne({ where: { username: username, password: password } });
    if (user) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
      res.send({
        token: token,
      });
    } else {
      res.status(401).send({
        error: 'Incorrect credentials.',
      });
    }
  });

  app.listen(8000, () => {
    console.log('Server started');
  });
};

main();
