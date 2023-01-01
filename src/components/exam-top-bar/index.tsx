import React, { memo, Suspense, useState } from 'react';
import cls from 'classnames';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import TimeDisplay from '../time-display';
import SubmitModal from '@/components/submit-modal';

import logo from '@/assets/logo.png';
import styles from './styles.module.scss';

interface Props {
  title?: string;
  okHandler?: any;
}
const ExamTopBar: React.FC<Props> = (props: Props) => {
  const [showSubmitModal, setIsShowSubmitModal] = useState(false);
  const { title, okHandler } = props;
  const clickButton = () => {
    setIsShowSubmitModal(true);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.examTopbar}>
        <div className={styles.leftContent}>
          <img src={logo}></img>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.rightContent}>
          <div className={styles.clock}>
            <TimeDisplay />
          </div>
          <div className={styles.divider}></div>
          <Button
            size='large'
            style={{ width: '100px' }}
            onClick={() => {
              clickButton();
            }}>
            交卷
          </Button>
        </div>
      </div>
      <SubmitModal visible={showSubmitModal} setIsShowSubmitModal={setIsShowSubmitModal} okHandler={okHandler} />
    </div>
  );
};

export default ExamTopBar;
