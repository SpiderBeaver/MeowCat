import express from 'express';
import jwt from 'jsonwebtoken';
import PostDto from '../dto/post.dto';
import Post from '../entity/Post';
import postsService from '../services/posts.service';

const postsController = {
  getPosts: async (req: express.Request, res: express.Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenData = token ? <any>jwt.verify(token, process.env.JWT_SECRET!) : null;
    const userId = tokenData?.userId;
    const username = req.query.username as string | undefined;
    if (username != undefined) {
      const posts = await postsService.getPostsByUser(username);
      const postsDto = posts.map((p) => postToDto(p, userId));
      return res.json(postsDto);
    } else {
      const posts = await postsService.getPosts();
      const postsDto = posts.map((p) => postToDto(p, userId));
      return res.json(postsDto);
    }
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

  addLike: async (req: express.Request, res: express.Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const tokenData = <any>jwt.verify(token!, process.env.JWT_SECRET!);
      const userId = tokenData.userId;
      const postId = req.body.postId;
      await postsService.addLike(postId, userId);
      res.send({ ok: 'ok' });
    } catch (e) {
      return res.status(400).send();
    }
  },

  removeLike: async (req: express.Request, res: express.Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const tokenData = <any>jwt.verify(token!, process.env.JWT_SECRET!);
      const userId = tokenData.userId;
      const postId = req.body.postId;
      await postsService.removeLike(postId, userId);
      res.send({ ok: 'ok' });
    } catch (e) {
      return res.status(400).send();
    }
  },
};

function postToDto(post: Post, userId?: number) {
  return <PostDto>{
    id: post.id,
    text: post.text,
    user: {
      id: post.user.id,
      username: post.user.username,
      avatar: post.user.avatar,
    },
    createdAt: post.createdAt,
    likes: post.likes.length,
    likedByMe: post.likes.some((u) => u.id === userId),
  };
}

export default postsController;
