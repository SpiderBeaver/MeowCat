import express from 'express';
import authService from '../services/auth.service';
import usersService from '../services/users.service';

const authController = {
  login: async (req: express.Request, res: express.Response) => {
    const { username, password }: { username: string; password: string } = req.body;
    // TODO: Validation
    try {
      const token = await authService.login(username, password);
      res.send({ token: token });
    } catch (e) {
      res.status(401).send({ error: 'Incorrect credentials.' });
    }
  },

  signup: async (req: express.Request, res: express.Response) => {
    const { username, password }: { username: string; password: string } = req.body;
    // TODO: Validation
    try {
      const token = await usersService.addUser(username, password);
      res.send({ token: token });
    } catch (e) {
      res.status(400).send({ error: 'Cannot create a new user.' });
    }
  },
};

export default authController;
