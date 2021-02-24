import { getConnection } from 'typeorm';
import Post from '../entity/Post';

const postsService = {
  getPosts: async () => {
    const connection = getConnection();
    const postsRepository = connection.getRepository(Post);
    const posts = await postsRepository.find();
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
