import React, { useState } from 'react';
import styles from './NewPost.module.css';

export default function NewPost() {
  const [newPostText, setNewPostText] = useState('');

  const handleNewPostButton = async () => {
    // TODO: Validation
    const jwt = localStorage.getItem('jwt');
    const response = await fetch('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        text: newPostText,
      }),
    });
    if (response.status === 200) {
      console.log('Post created successfully!');
      setNewPostText('');
    } else {
      console.log('Errror');
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
