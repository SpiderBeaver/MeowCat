import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import api from '../api';
import User from '../domain/User';
import Container from './Container';
import Post from '../domain/Post';
import PostsList from './PostsList';
import Avatar, { AvatarType } from './Avatar';

export default function ProfilePage() {
  const { username: initialUsername } = useParams() as { username: string };

  const [username, setUsername] = useState<string>(initialUsername);
  const [avatar, setAvatar] = useState<string | null>(null);

  // TODO: We only need posts count.
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await api.getUser(initialUsername);
      const user = new User();
      console.log(userData);
      user.id = userData.id;
      user.username = userData.username;
      user.avatar = userData.avatar;

      console.log(user);
      setUsername(user.username);
      setAvatar(user.avatar);
    };
    fetchUser();
  }, [initialUsername]);

  useEffect(() => {
    const fetchPosts = async (username: string) => {
      const posts = await api.getPostsByUser(username);
      setPosts(posts);
    };
    fetchPosts(initialUsername);
  }, [initialUsername]);

  const handleChangePicture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt == null) {
      console.error('No token in local storage.');
      return;
    }

    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const uploadResponse = await fetch('http://192.168.1.7:8000/uploads/images', {
        method: 'POST',
        body: formData,
      });
      if (uploadResponse.status === 200) {
        const uploadResponseData = await uploadResponse.json();
        const uploadedFilename = uploadResponseData.filename as string;
        await api.updateProfile(jwt, uploadedFilename);
        setAvatar(uploadedFilename);
      }
    }
  };

  return (
    <Container>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <Avatar filename={avatar} type={AvatarType.Large} />

          <label className={styles.profile_pic_upload_button}>
            <input
              type="file"
              accept="image/jpeg"
              className={styles.profile_pic_upload_input}
              onChange={handleChangePicture}
            />
            {avatar ? 'Change picture' : 'Upload picture'}
          </label>
        </div>

        <div className={styles.userinfo}>
          <span className={styles.username}>{username}</span>
          <span>{posts?.length} posts</span>
        </div>
      </div>

      <PostsList username={username} />
    </Container>
  );
}
