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
      const jwt = localStorage.getItem('jwt');
      const posts = username ? await api.getPostsByUser(username) : await api.getPosts(jwt ?? undefined);
      console.log(posts);
      setPosts(posts);
    };
    fetchData();
  }, [username]);

  const handlePostLike = async (postId: number) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }

    let post = posts.find((p) => p.id === postId);
    if (!post) {
      return;
    }

    let newPost = { ...post } as Post;
    if (!newPost.likedByMe) {
      await api.addLike(jwt, newPost.id);
      newPost.likedByMe = true;
      newPost.likes += 1;
    } else {
      await api.removeLike(jwt, newPost.id);
      newPost.likedByMe = false;
      newPost.likes -= 1;
    }

    let newPosts = [...posts.filter((p) => p !== post), newPost];

    setPosts(newPosts);
  };

  return (
    <ul className={styles.posts_list}>
      {posts
        .sort((post1, post2) => post2.createdAt.getTime() - post1.createdAt.getTime())
        .map((post) => (
          <li key={post.id}>
            <PostListItem post={post} onPostLike={handlePostLike} />
          </li>
        ))}
    </ul>
  );
}
