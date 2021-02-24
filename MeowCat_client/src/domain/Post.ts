import User from './User';

export default class Post {
  id!: number;
  text!: string;
  user!: User;
  createdAt!: Date;
}
