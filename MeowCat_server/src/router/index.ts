import express from 'express';
import authController from '../controllers/auth.controller';
import usersController from '../controllers/users.controller';
import postsController from '../controllers/posts.controller';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/me', usersController.getMe);
router.get('/users', usersController.getUsers);

router.get('/posts', postsController.getPosts);
router.post('/posts', postsController.addPost);

export default router;
