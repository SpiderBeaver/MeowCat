import express from 'express';
import authService from '../services/auth.service';
import usersService from '../services/users.service';
import { body, validationResult } from 'express-validator';

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

  signupValidate: () => {
    return [
      body('username').exists(),
      body('username').trim(),
      body('username', 'The username must only contain letters and number').isAlphanumeric(),
      body('username', 'The username must be between 4 and 30 characters.').isLength({ min: 4, max: 30 }),
      body('password').exists(),
      body('password').trim(),
      body('password', 'The passrword must only contain letters and number').isAlphanumeric(),
      body('password', 'The password must be between 4 and 30 characters.').isLength({ min: 4, max: 30 }),
    ];
  },

  signup: async (req: express.Request, res: express.Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ validationErrors: validationErrors.array() });
    }

    const { username, password }: { username: string; password: string } = req.body;

    try {
      const token = await usersService.addUser(username, password);
      return res.send({ token: token });
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({ error: e.message });
      } else {
        return res.status(400).json({ error: 'Unknown error' });
      }
    }
  },
};

export default authController;
