import React, { memo, Suspense } from 'react';
import styles from './styles.module.scss';

const Card: React.FC = (props) => {
  const { title, description, junmLink } = props;
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.jumpButton}>去做题 &gt; &gt;</div>
    </div>
  );
};

export default Card;
