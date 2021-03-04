import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Post from './Post';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  passwordHash!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string | null = null;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
