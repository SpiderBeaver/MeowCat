import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 320 })
  text!: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE', nullable: false, eager: true })
  user!: User;

  @Column()
  createdAt!: Date;

  @ManyToMany(() => User)
  @JoinTable()
  likes!: User[];
}
