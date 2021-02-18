import React, { FormEvent, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import styles from './SignupForm.module.css';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userContext = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/signup', {
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
      const data = await response.json();
      localStorage.setItem('jwt', data.token);
      userContext.login(username);
      history.push('/');
    } else {
      console.log('Errror');
    }
  };

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
        <Link to="/login" className={styles.link}>
          I already have an account
        </Link>
        <input type="submit" value="Sign Up" className={styles.submit}></input>
      </div>
    </form>
  );
}
