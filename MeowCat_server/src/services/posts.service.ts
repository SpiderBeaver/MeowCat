import { getConnection, SelectQueryBuilder } from 'typeorm';
import Post from '../entity/Post';

const postsService = {
  getPosts: async () => {
    const connection = getConnection();
    const postsRepository = connection.getRepository(Post);
    const posts = await postsRepository.find();
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
};

export default postsService;
