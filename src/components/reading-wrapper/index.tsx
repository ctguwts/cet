import React, { memo, ReactNode, Suspense } from 'react';
import { Divider } from 'antd';
import ExamTopBar from '@/components/exam-top-bar';
import styles from './styles.module.scss';

interface Props {
  clickOuter?: any;
  okHandler?: any;
  topBarTitle?: any;
  children?: ReactNode;
}

const ReadingWrapper: React.FC<Props> = (props: Props) => {
  const { clickOuter, okHandler, topBarTitle, children } = props;
  const leftContent = children[0];
  const rightContent = children[1];
  return (
    <div className={styles.wrapper}>
      <ExamTopBar title={topBarTitle} okHandler={okHandler} />
      <div
        className={styles.reading}
        onClick={() => {
          clickOuter();
        }}>
        <div className={styles.left}>
          <div className={styles.topRow}>
            <div>我是面包屑</div>
          </div>
          <Divider className={styles.divider} />
          <div
            className={styles.leftScrollConetnt}
            onScroll={() => {
              clickOuter();
            }}>
            {leftContent}
          </div>
        </div>
        <div
          className={styles.right}
          onScroll={() => {
            clickOuter();
          }}>
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default ReadingWrapper;
