import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../context/current-user.context';
import styles from './Header.module.css';
import LogoutButton from './LogoutButton';

export default function Header() {
  const [currentUser] = useCurrentUser();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        MeowCat
      </Link>
      <div className={styles.user_info}>
        {currentUser != null ? (
          <Fragment>
            <span className={styles.username}>@{currentUser.username}</span>
            <Link to={`/u/${currentUser.username}`}>Profile</Link>
            <LogoutButton />
          </Fragment>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
