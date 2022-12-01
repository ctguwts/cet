import React, { memo, Suspense } from 'react';
import cls from 'classnames';
import styles from './styles.module.scss';

const Menu: React.FC = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.buttonGroup}>
        <div className={cls(styles.button,'text')}>首页</div>
        <div className={styles.button}>听力理解</div>
        <div className={styles.button}>阅读理解</div>
      </div>
    </div>
  );
};

export default Menu;
