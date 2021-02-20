import React, { FormEvent, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../api';
import UserContext from '../context/UserContext';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const userContext = useContext(UserContext);
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const jwt = await api.login(username, password);
      localStorage.setItem('jwt', jwt);
      userContext.login(username);
      history.push('/');
    } catch (e) {
      console.log('Error logging in.');
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
        <Link to="/signup" className={styles.link}>
          Create account
        </Link>
        <input type="submit" value="Login" className={styles.submit}></input>
      </div>
    </form>
  );
}
