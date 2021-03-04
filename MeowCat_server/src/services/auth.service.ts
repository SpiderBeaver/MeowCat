import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../entity/User';

const authService = {
  login: async (username: string, password: string) => {
    const connection = getConnection();
    const usersRepository = connection.getRepository(User);
    const user = await usersRepository.findOne({ where: { username: username } });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    return token;
  },
};

export default authService;
