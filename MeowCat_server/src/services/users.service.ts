import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';
import User from '../entity/User';
import bcrypt from 'bcrypt';

const usersService = {
  getUserById: async (userId: number) => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne(userId);
    if (user == undefined) {
      throw new Error('User not found');
    }
    return user;
  },

  getUserByName: async (username: string) => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne({ where: { username: username } });
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
    const userRepository = connection.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { username: username } });
    if (existingUser) {
      throw new Error('User already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUserData = userRepository.create({ username: username, passwordHash: passwordHash });
    const newUser = await userRepository.save(newUserData);
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!);
    return token;
  },

  updateUser: async (id: number, avatar: string) => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    user.avatar = avatar;
    console.log(avatar);
    console.log(user);
    userRepository.save(user);
  },
};

export default usersService;
