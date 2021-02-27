import { getConnection, SelectQueryBuilder } from 'typeorm';
import Post from '../entity/Post';
import User from '../entity/User';

const postsService = {
  getPosts: async () => {
    const connection = getConnection();
    const postsRepository = connection.getRepository(Post);
    const posts = await postsRepository.find({ relations: ['likes'] });
    return posts;
  },

  getPostsByUser: async (username: string) => {
    const connection = getConnection();
    const postsRepository = connection.getRepository(Post);
    console.log(username);
    // const posts = await postsRepository.find({ where: { user: { username: username } } });
    const posts = postsRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.likes', 'likes')
      .where('user.username = :username', { username })
      .getMany();
    return posts;
  },

  addPost: async (userId: number, newPostText: string) => {
    const connection = getConnection();
    const postsRepository = connection.getRepository(Post);
    const newPost = postsRepository.create({ text: newPostText, user: { id: userId }, createdAt: new Date() });
    const result = await postsRepository.save(newPost);
    return result.id;
  },

  addLike: async (postId: number, userId: number) => {
    const connection = getConnection();

    const postsRepository = connection.getRepository(Post);
    const post = await postsRepository.findOne(postId, { relations: ['likes'] });
    if (!post) {
      throw new Error('Post not found.');
    }

    if (post.likes.some((u) => u.id == userId)) {
      // A post can't have more than one like from the same user.
      return;
    }

    const usersRepository = connection.getRepository(User);
    const user = await usersRepository.findOne(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    post.likes.push(user);
    postsRepository.save(post);
  },

  removeLike: async (postId: number, userId: number) => {
    const connection = getConnection();

    const postsRepository = connection.getRepository(Post);
    const post = await postsRepository.findOne(postId, { relations: ['likes'] });
    if (!post) {
      throw new Error('Post not found.');
    }

    post.likes = post.likes.filter((u) => u.id != userId);
    postsRepository.save(post);
  },
};

export default postsService;
