import React, { memo, Suspense } from 'react';
import cls from 'classnames';
import RoundedButton from '@/components/rounded-button';
import styles from './styles.module.scss';

const PersonalArchive: React.FC = (props) => {
  return (
    <div className={styles.personalArchive}>
      <div className={styles.cover}>
        <div className={styles.guildText}>{`请登录开启\n个人学情档案`}</div>
        <div className={styles.buttonGroup}>
          <div className={styles.roundedButton}>
            <RoundedButton text='登陆' style={styles.loginButton} />
          </div>
          <div className={styles.roundedButton}>
            <RoundedButton text='注册' style={styles.registerButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalArchive;
