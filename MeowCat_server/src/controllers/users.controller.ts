import express from 'express';
import jwt from 'jsonwebtoken';
import usersService from '../services/users.service';

const usersController = {
  getMe: async (req: express.Request, res: express.Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    // TODO: Create a type for jwt data.
    // TODO: Handle errors
    const decodedJwt = <any>jwt.verify(token!, process.env.JWT_SECRET!);
    const userId = decodedJwt.userId;
    try {
      const user = await usersService.getUserById(userId);
      res.send({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      });
    } catch (e) {
      return res.send({ error: 'Incorrect token' });
    }
  },

  updateProfile: async (req: express.Request, res: express.Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { avatar }: { avatar: string } = req.body;
    // TODO: Create a type for jwt data.
    // TODO: Handle errors
    const decodedJwt = <any>jwt.verify(token!, process.env.JWT_SECRET!);
    const userId = decodedJwt.userId;
    try {
      await usersService.updateUser(userId, avatar);
      return res.send({ ok: 'ok' });
    } catch (e) {
      // TODO: Meaningfull errors
      return res.status(400).send({ error: 'Error' });
    }
  },

  getUser: async (req: express.Request, res: express.Response) => {
    const username = req.query.username as string;
    try {
      const user = await usersService.getUserByName(username);
      res.send({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        posts: user.posts,
      });
    } catch (e) {
      return res.send({ error: 'User does not exist' });
    }
  },

  getUsers: async (req: express.Request, res: express.Response) => {
    const users = await usersService.getUsers();
    res.json(users);
  },
};

export default usersController;
