import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import User from '../entity/User';

const authService = {
  login: async (username: string, password: string) => {
    const connection = getConnection();
    const usersRepository = connection.getRepository(User);
    const user = await usersRepository.findOne({ where: { username: username, password: password } });
    if (user) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
      return token;
    } else {
      throw new Error('Invalid credentials');
    }
  },
};

export default authService;
