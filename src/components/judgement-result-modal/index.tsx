import React, { CSSProperties, memo, Suspense, useState } from 'react';
import { Modal, Table } from 'antd';
import cls from 'classnames';
import styles from './styles.module.scss';

interface Props {
  visible?: boolean;
  closeModal?: any;
}
const JudgementResultModal: React.FC<Props> = (props) => {
  const { visible, closeModal } = props;

  return (
    <Modal centered onOk={closeModal} onCancel={closeModal} visible={visible} title='答题分析' okText='再接再厉！' cancelText='继续加油！'>
      <div className={styles.title}>再加个油就完美了</div>
      <div className={styles.content}>
        <div className={styles.block}> 正确率:80%</div>
        <div className={styles.block}> 耗时:20:23</div>
      </div>
    </Modal>
  );
};

export const useJudgementResultModal = () => {
  const [visible, setVisible] = useState(false);
  const closeModal = () => {
    setVisible(false);
  };
  const openModal = () => {
    setVisible(true);
  };

  return {
    judgementResultModal: <JudgementResultModal visible={visible} closeModal={closeModal} />,
    closeModal: closeModal,
    openModal: openModal,
  };
};

export default JudgementResultModal;
