import React from 'react';
import styles from './PostListItem.module.css';
import Post from '../domain/Post';

type PostListItemProps = {
  post: Post;
};

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <div className={styles.post}>
      <div className={styles.heading}>
        <span className={styles.username}>{post.user.username}</span>
      </div>
      <div className={styles.text}>{post.text}</div>
    </div>
  );
}
