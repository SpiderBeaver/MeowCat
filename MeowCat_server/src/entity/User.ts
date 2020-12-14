import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Post from './Post';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
