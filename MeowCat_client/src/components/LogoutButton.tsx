import React from 'react';
import { useCurrentUser } from '../context/current-user.context';
import styles from './LogoutButton.module.css';

export default function LogoutButton() {
  const [, setCurrentUser] = useCurrentUser();

  const handleClick = () => {
    setCurrentUser(null);
    localStorage.removeItem('jwt');
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      Logout
    </button>
  );
}
