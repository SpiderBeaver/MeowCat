import React, { FormEvent, useState } from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData);
    } else {
      console.log('Errror');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        className={styles.textbox}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Password"
        className={styles.textbox}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <div className={styles.controls}>
        <a href="#" className={styles.link}>
          Create account
        </a>
        <input type="submit" value="Sign Up" className={styles.submit}></input>
      </div>
    </form>
  );
}
