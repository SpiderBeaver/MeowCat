import express from 'express';
import jwt from 'jsonwebtoken';
import postsService from '../services/posts.service';

const postsController = {
  getPosts: async (req: express.Request, res: express.Response) => {
    const posts = await postsService.getPosts();
    res.json(posts);
  },

  addPost: async (req: express.Request, res: express.Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const tokenData = <any>jwt.verify(token!, process.env.JWT_SECRET!);
      const userId = tokenData.userId;
      const newPostText = req.body.text;
      const newPostId = await postsService.addPost(userId, newPostText);
      res.send({ id: newPostId });
    } catch (e) {
      return res.status(400).send();
    }
  },
};

export default postsController;