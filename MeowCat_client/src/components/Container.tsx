import React, { FunctionComponent } from 'react';
import styles from './Container.module.css';

const Container: FunctionComponent = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
