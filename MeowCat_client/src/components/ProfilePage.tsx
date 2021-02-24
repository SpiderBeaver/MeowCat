import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import api from '../api';
import User from '../domain/User';
import Container from './Container';
import Post from '../domain/Post';
import PostsList from './PostsList';

export default function ProfilePage() {
  const { username } = useParams() as { username: string };

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUser = async (username: string) => {
      const userData = await api.getUser(username);
      const user = new User();
      user.id = userData.id;
      user.username = userData.username;
      setUser(user);
    };
    fetchUser(username);
  }, [username]);

  useEffect(() => {
    const fetchPosts = async (username: string) => {
      const posts = await api.getPostsByUser(username);
      setPosts(posts);
    };
    fetchPosts(username);
  }, [username]);

  return (
    <Container>
      <div className={styles.userinfo}>
        <span className={styles.username}>{user?.username}</span>
      </div>
      <PostsList posts={posts} />
    </Container>
  );
}
