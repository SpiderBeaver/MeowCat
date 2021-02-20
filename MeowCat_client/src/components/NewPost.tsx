import React, { useState } from 'react';
import api from '../api';
import styles from './NewPost.module.css';

export default function NewPost() {
  const [newPostText, setNewPostText] = useState('');

  const handleNewPostButton = async () => {
    // TODO: Validation
    const jwt = localStorage.getItem('jwt');
    if (jwt == null) {
      console.error('No token in local storage.');
      return;
    }

    try {
      await api.addPost(jwt, newPostText);
      setNewPostText('');
    } catch (e) {
      console.error('Error creating new post.');
    }
  };

  return (
    <div className={styles.new_post}>
      <textarea
        className={styles.new_post_input}
        placeholder="Say meow"
        value={newPostText}
        onChange={(event) => {
          console.log(event.target);
          setNewPostText(event.target.value);
        }}
      ></textarea>
      <button className={styles.new_post_button} onClick={handleNewPostButton}>
        Meow
      </button>
    </div>
  );
}
