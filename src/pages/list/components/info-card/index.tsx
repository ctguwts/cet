import React, { memo, Suspense } from 'react';
import { Button } from 'antd';

import { formateCardTitle } from '@/utils';

import styles from './styles.module.scss';

interface Props {
  img?: string;
  month?: string | number;
  version?: string | number;
  year?: string | number;
  cardType?: string; //tab，可选值：长篇阅读，选词填空，仔细阅读......
}
const InfoCard: React.FC<Props> = (props) => {
  const { img, month, version, year, cardType } = props;
  const title = formateCardTitle(year, month, version);

  return (
    <div className={styles.card}>
      <img src={img} width='260px' height='194px' className={styles.img} />
      <div className={styles.cssMask}>
        {title}
        <div className={styles.jumpButton}>{cardType}</div>
        <div className={styles.jumpButton}>
          <Button type='primary'>开始练习</Button>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
