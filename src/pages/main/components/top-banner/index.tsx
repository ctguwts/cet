import React, { memo, Suspense } from 'react';
import 全面专业的题库 from '@/assets/main/全面专业的题库.svg';
import 严谨科学的规划 from '@/assets/main/严谨科学的规划.svg';
import 详尽的题目解析 from '@/assets/main/详尽的题目解析.svg';
import styles from './styles.module.scss';

const TopBanner: React.FC = () => {
  return (
    <div className={styles.topBanner}>
      <div className={styles.mainText}>C E T</div>
      <div className={styles.title}>备考四级从这里开始</div>
      <div className={styles.content}>
        <div className={styles.block}>
          <div className={styles.blockTitle}>全面专业的题库</div>
          <img src={全面专业的题库} width='128px' height='129px'></img>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>严谨科学的规划</div>
          <img src={严谨科学的规划} width='113px' height='123px'></img>
        </div>
        <div className={styles.block}>
          <div className={styles.blockTitle}>详尽的题目解析</div>
          <img src={详尽的题目解析} width='124px' height='112px'></img>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
