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
      });
    } catch (e) {
      return res.send({ error: 'Incorrect token' });
    }
  },

  getUser: async (req: express.Request, res: express.Response) => {
    console.log('HI');
    const username = req.query.username as string;
    console.log(username);
    try {
      const user = await usersService.getUserByName(username);
      res.send({
        id: user.id,
        username: user.username,
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
