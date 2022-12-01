import React, { memo, Suspense } from 'react';
import TopBanner from './components/top-banner';
import Card from './components/card';
import Menu from '@/components/menu';
import styles from './styles.module.scss';

interface Props {
  name: string;
  age: number;
}
const Main: React.FC<Props> = (prop) => {
  const { name, age, what } = prop;
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
            />
            <Card
              title='长对话'
              description='我是description我是description我是description'
            />
            <Card
              title='短文理解'
              description='我是description我是description我是description'
            />
          </div>
        </div>
        <div className={styles.part}>
          <div className={styles.partTitle}>阅读理解</div>
          <div className={styles.partContent}>
            <Card
              title='选词填空'
              description='我是description我是description我是description'
            />
            <Card
              title='长篇阅读'
              description='我是description我是description我是description'
            />
            <Card
              title='仔细阅读'
              description='我是description我是description我是description'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
