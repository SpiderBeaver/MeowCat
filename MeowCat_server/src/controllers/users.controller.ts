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
      const user = await usersService.getUser(userId);
      res.send({
        id: user.id,
        username: user.username,
      });
    } catch (e) {
      return res.send({ error: 'Incorrect token' });
    }
  },

  getUsers: async (req: express.Request, res: express.Response) => {
    const users = await usersService.getUsers();
    res.json(users);
  },
};

export default usersController;
