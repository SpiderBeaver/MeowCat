import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';
import User from '../entity/User';

const usersService = {
  getUser: async (userId: number) => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne(userId);
    if (user == undefined) {
      throw new Error('User not found');
    }
    return user;
  },

  getUsers: async () => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const users = await userRepository.find();
    return users;
  },

  addUser: async (username: string, password: string) => {
    const connection = getConnection();
    // TODO: Check if user already exisits
    const userRepository = connection.getRepository(User);
    const newUserData = userRepository.create({ username: username, password: password });
    const newUser = await userRepository.save(newUserData);
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!);
    return token;
  },
};

export default usersService;
