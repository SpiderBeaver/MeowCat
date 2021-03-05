import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api, { ValidationError } from '../api';
import { useCurrentUser } from '../context/current-user.context';
import styles from './SignupForm.module.css';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [, setCurrentUser] = useCurrentUser();
  const history = useHistory();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (username.trim() === '') {
      setError('Please enter username.');
      return;
    }
    if (password.trim() === '') {
      setError('Please enter password.');
      return;
    }

    try {
      const jwt = await api.signup(username, password);
      localStorage.setItem('jwt', jwt);
      // TODO: Fix id
      setCurrentUser({ id: 0, username: username });
      history.push('/');
    } catch (e) {
      if (e instanceof ValidationError) {
        setError(e.message);
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        console.log('Unespected error');
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        className={styles.textbox}
        value={username}
        onChange={(event) => setUsername(event.target.value.trim())}
      ></input>
      <input
        type="text"
        placeholder="Password"
        className={styles.textbox}
        value={password}
        onChange={(event) => setPassword(event.target.value.trim())}
      ></input>
      <p className={styles.error}>{error}</p>
      <div className={styles.controls}>
        <Link to="/login" className={styles.link}>
          I already have an account
        </Link>
        <input type="submit" value="Sign Up" className={styles.submit}></input>
      </div>
    </form>
  );
}
