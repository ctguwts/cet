import React, { memo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import TopBanner from './components/top-banner';
import Card from './components/card';
import Menu from '@/components/menu';

import { VOCABULARYCOMPREHENSION, LONGREADING, CAREFULREADING } from '@/const';
import styles from './styles.module.scss';

const Main: React.FC = () => {
  const navigate = useNavigate();

  const jumpToShortNews = () => {
    console.log('准备跳转', navigate);
    navigate('/list');
  };

  return (
    <div>
      <Menu />
      <TopBanner />
      <div className={styles.content}>
        <div className={styles.part}>
          <div className={styles.partTitle}>听力理解</div>
          <div className={styles.partContent}>
            <Card
              title='短篇新闻'
              description='我是description我是description我是description'
              jumpParam='shortNews'
            />
            <Card
              title='长对话'
              description='我是description我是description我是description'
              jumpParam='longConversation'
            />
            <Card
              title='短文理解'
              description='我是description我是description我是description'
              jumpParam='shortReading'
            />
          </div>
        </div>
        <div className={styles.part}>
          <div className={styles.partTitle}>阅读理解</div>
          <div className={styles.partContent}>
            <Card
              title='选词填空'
              description='我是description我是description我是description'
              jumpParam={VOCABULARYCOMPREHENSION}
            />
            <Card
              title='长篇阅读'
              description='我是description我是description我是description'
              jumpParam={LONGREADING}
            />
            <Card
              title='仔细阅读'
              description='我是description我是description我是description'
              jumpParam={CAREFULREADING}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
