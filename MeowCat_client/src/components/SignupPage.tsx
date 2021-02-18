import React from 'react';
import styles from './SignupPage.module.css';
import SignupForm from './SignupForm';

export default function SignupPage() {
  // TODO: Actually center the form on a page instead of padding
  return (
    <div className={styles.signup_form_container}>
      <SignupForm />
    </div>
  );
}
