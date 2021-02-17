import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import styles from './LogoutButton.module.css';

export default function LogoutButton() {
  const userContext = useContext(UserContext);

  const handleClick = () => {
    userContext.logout();
    localStorage.removeItem('jwt');
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      Logout
    </button>
  );
}
