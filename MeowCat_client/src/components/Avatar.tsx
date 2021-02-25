import React from 'react';
import api from '../api';
import styles from './Avatar.module.css';

export enum AvatarType {
  Medium,
  Large,
}

const classnameByType = (type: AvatarType) => {
  switch (type) {
    case AvatarType.Medium:
      return styles.medium;
    case AvatarType.Large:
      return styles.large;
  }
};

export default function Avatar({ filename, type = AvatarType.Medium }: { filename: string | null; type?: AvatarType }) {
  const src = filename ? api.imageFullUrl(filename) : null;

  return src != null ? (
    <img src={src} alt="User's avatar" className={`${styles.avatar_img} ${classnameByType(type)}`} />
  ) : (
    <div className={`${styles.avatar_placeholder} ${classnameByType(type)}`}>
      <span>INCOGNITO</span>
    </div>
  );
}
