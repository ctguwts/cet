import React, { CSSProperties, memo, Suspense, useState } from 'react';
import { Modal } from 'antd';
import cls from 'classnames';
import styles from './styles.module.scss';

interface Props {
  text?: string; //按钮中的文字
  style?: string; //按钮样式,本质是classname
  visible?: boolean;
  setIsShowSubmitModal?: any;
}

interface SubmitModalProps {
  visible?: boolean;
  okHandler?: any;
  cancelHandler?: any;
  setIsShowSubmitModal?: any;
}
const SubmitModal: React.FC<SubmitModalProps> = (props) => {
  let { visible, setIsShowSubmitModal, okHandler } = props;
  const cancelHandler = () => {
    setIsShowSubmitModal(false);
  };
  const onOk = () => {
    setIsShowSubmitModal(false);
    okHandler();
  };
  return (
    <Modal visible={visible} onOk={onOk} onCancel={cancelHandler} title='交卷提醒' okText='确认交卷' cancelText='再检查看看'>
      <p>交卷后无法修改答案，是否确认交卷</p>
    </Modal>
  );
};

export const usePrivacyModal = () => {
  const [visible, setVisible] = useState(false);
};

export default SubmitModal;
