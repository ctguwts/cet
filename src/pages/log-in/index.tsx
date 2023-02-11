import React, { memo, Suspense, useEffect, useMemo, useState } from 'react';
import LoginCard from '@/components/log-in-card';
import styles from './styles.module.scss';
export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginCard />
    </div>
  );
};

export default LoginPage;
