import express from 'express';
import multer from 'multer';
import authController from '../controllers/auth.controller';
import usersController from '../controllers/users.controller';
import postsController from '../controllers/posts.controller';
import imagesController from '../controllers/images.controller';
import crypro from 'crypto';
import path from 'path';
import fs from 'fs';

const uploadedImagesPath = path.join(__dirname, '../uploads/images/');
if (!fs.existsSync(uploadedImagesPath)) {
  fs.mkdirSync(uploadedImagesPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/images/'));
  },
  filename: (req, file, cb) => {
    const filename = crypro.randomBytes(12).toString('hex');
    const extension = path.extname(file.originalname);
    cb(null, filename + extension);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/me', usersController.getMe);
router.get('/user', usersController.getUser);
router.post('/user/update', usersController.updateProfile);
router.get('/users', usersController.getUsers);

router.get('/posts', postsController.getPosts);
router.post('/posts', postsController.addPost);
router.post('/posts/addLike', postsController.addLike);
router.post('/posts/removeLike', postsController.removeLike);

router.get('/uploads/images/:filename', imagesController.getImage);
router.post('/uploads/images', upload.single('image'), imagesController.upload);

export default router;
