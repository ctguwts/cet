import React, { memo, Suspense } from 'react';
import { Tooltip } from 'antd';
import cls from 'classnames';
import styles from './styles.module.scss';

interface Props {
  title?: any;
  children: React.ReactNode;
  toolTipWidth?: any;
  isOpen?: boolean;
  clickCallback?: any;
}
const TranslationToolip: React.FC<Props> = (props: Props) => {
  const { title, children, toolTipWidth, isOpen, clickCallback } = props;
  let showText = '';
  if (Array.isArray(children)) {
    showText = children.join('');
  } else if (typeof children === 'string') {
    showText = children;
  }

  return (
    <Tooltip title={title} trigger='click' overlayClassName={styles.tootip} overlayStyle={{ maxWidth: toolTipWidth }} placement='topLeft' open={isOpen}>
      <span
        className={cls(styles.phase, { [styles.activePhase]: isOpen })}
        dangerouslySetInnerHTML={{ __html: showText }}
        onClick={(event) => {
          clickCallback?.(event, title, showText);
        }}></span>
    </Tooltip>
  );
};

export default TranslationToolip;
