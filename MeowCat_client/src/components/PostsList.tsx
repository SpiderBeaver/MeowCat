import React, { useEffect, useState } from 'react';
import styles from './PostsList.module.css';
import Post from '../domain/Post';
import PostListItem from './PostListItem';
import api from '../api';

type PostsListProps = {
  // TODO: Change to user id
  username?: string;
};

export default function PostsList({ username }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = username ? await api.getPostsByUser(username) : await api.getPosts();
      setPosts(posts);
    };
    fetchData();
  }, [username]);

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
