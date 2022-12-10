import React, { memo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

interface Prop {
  title: string;
  description: string;
  jumpParam?: string;
}
const Card: React.FC<Prop> = (props: any) => {
  const { title, description, jumpParam } = props;

  const navigate = useNavigate();

  const jumpToShortNews = () => {
    navigate('/list', {
      replace: false,
      state: {
        jumpParam,
      },
    });
  };
  return (
    <div
      className={styles.card}
      onClick={() => {
        jumpToShortNews();
      }}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.jumpButton}>去做题 &gt; &gt;</div>
    </div>
  );
};

export default Card;
