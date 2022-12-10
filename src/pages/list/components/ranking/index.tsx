import React, { CSSProperties, memo, Suspense } from 'react';
import cls from 'classnames';

import { week_wrong_ranking_reading } from '@/mock-data/data';
import styles from './styles.module.scss';
import Item from 'antd/es/list/Item';

interface Props {}
const Ranking: React.FC<Props> = (props) => {
  //此处模拟网络请求，获取错题排行榜week_wrong_ranking_reading

  return (
    <div className={styles.ranking}>
      <div className={styles.title}>本周错题排行榜</div>
      <div>
        {week_wrong_ranking_reading.map((item, index) => {
          return (
            <div className={styles.rankingItem}>
              <div className={styles.serialNumber}>{index}</div>
              <div className={styles.text}>{item.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ranking;
