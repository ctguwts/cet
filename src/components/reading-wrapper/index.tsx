import React, { memo, ReactNode, Suspense, useState } from 'react';
import { Divider } from 'antd';
import ExamTopBar from '@/components/exam-top-bar';
import styles from './styles.module.scss';

interface Props {
  clickOuter?: any;
  okHandler?: any;
  topBarTitle?: any;
  children?: ReactNode;
  rightNoPadding?: boolean; //右侧白色无padding，且没有滚动条
}

const ReadingWrapper: React.FC<Props> = (props: Props) => {
  const { clickOuter, okHandler, topBarTitle, children, rightNoPadding } = props;

  const [isExpand, setIsExpand] = useState(false);
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
        <div className={styles.left} style={{ display: isExpand ? 'none' : 'flex' }}>
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
          className={styles.expand}
          onClick={() => {
            setIsExpand(!isExpand);
          }}>
          展开
        </div>
        <div
          className={styles.right}
          style={{ padding: rightNoPadding ? '' : '30px', overflowY: rightNoPadding ? 'auto' : 'scroll' }}
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
