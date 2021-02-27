import React from 'react';
import styles from './PostsList.module.css';
import Post from '../domain/Post';
import PostListItem from './PostListItem';

type PostsListProps = {
  posts: Post[];
};

export default function PostsList({ posts }: PostsListProps) {
  console.log(posts);
  return (
    <ul className={styles.posts_list}>
      {posts
        .sort((post1, post2) => post2.createdAt.getTime() - post1.createdAt.getTime())
        .map((post) => (
          <li key={post.id}>
            <PostListItem post={post} />
          </li>
        ))}
    </ul>
  );
}
