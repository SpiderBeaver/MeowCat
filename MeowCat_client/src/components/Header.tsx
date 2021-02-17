import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import styles from './Header.module.css';
import LogoutButton from './LogoutButton';

export default function Header() {
  const user = useContext(UserContext);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        MeowCat
      </Link>
      <div className={styles.user_info}>
        {user.username != null ? (
          <Fragment>
            <span className={styles.username}>@{user.username}</span>
            <LogoutButton />
          </Fragment>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
