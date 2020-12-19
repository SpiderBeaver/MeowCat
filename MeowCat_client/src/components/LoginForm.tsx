import React from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  return (
    <form className={styles.form}>
      <input type="text" placeholder="Login" className={styles.textbox}></input>
      <input type="text" placeholder="Password" className={styles.textbox}></input>
      <div className={styles.controls}>
        <a href="#" className={styles.link}>
          Create account
        </a>
        <input type="submit" value="Sign Up" className={styles.submit}></input>
      </div>
    </form>
  );
}
