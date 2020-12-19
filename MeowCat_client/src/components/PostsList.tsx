import React from 'react';
import styles from './PostsList.module.css';
import Post from '../domain/Post';
import PostListItem from './PostListItem';

type PostsListProps = {
  posts: Post[];
};

export default function PostsList({ posts }: PostsListProps) {
  return (
    <ul className={styles.posts_list}>
      {posts.map((post) => (
        <li key={post.id}>
          <PostListItem post={post} />
        </li>
      ))}
    </ul>
  );
}
