import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import styles from './Header.module.css';

export default function Header() {
  const user = useContext(UserContext);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        MeowCat
      </Link>
      {user.username != null ? <span>Hi is user {user.username}</span> : <span>no syser sorry</span>}
    </header>
  );
}
