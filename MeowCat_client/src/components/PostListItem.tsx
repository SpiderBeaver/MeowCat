import React from 'react';
import styles from './PostListItem.module.css';
import Post from '../domain/Post';

type PostListItemProps = {
  post: Post;
};

export default function PostListItem({ post }: PostListItemProps) {
  console.log(post.createdAt);
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <span className={styles.username}>{post.user.username}</span>
        <span className={styles.datetime}>{post.createdAt.toLocaleString()}</span>
      </div>
      <div className={styles.text}>{post.text}</div>
    </div>
  );
}
