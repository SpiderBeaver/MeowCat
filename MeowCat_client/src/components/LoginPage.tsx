import React from 'react';
import LoginForm from './LoginForm';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  return (
    // TODO: Actually center the form on a page instead of padding
    <div className={styles.login_form_container}>
      <LoginForm />
    </div>
  );
}
