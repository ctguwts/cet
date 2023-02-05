import React, { memo, Suspense } from 'react';
import { Tooltip } from 'antd';
import cls from 'classnames';
import styles from './styles.module.scss';
import { copyFileSync } from 'fs';

interface Props {
  title?: any;
  children: React.ReactNode;
  toolTipWidth?: any;
  isOpen?: boolean;
  clickCallback?: any;
  questionIndex?: any;
  style?: any; //设置文本的字体和颜色
}

interface TranslationProps {
  questionWordsChinese: any;
}

const WordTranslation: React.FC<TranslationProps> = (props: TranslationProps) => {
  const { questionWordsChinese } = props;
  let cmp = null;
  if (Array.isArray(questionWordsChinese)) {
    cmp = (
      <>
        {questionWordsChinese.map((item) => {
          return <div className={styles.wordTranslationBox}>{item}</div>;
        })}
      </>
    );
  } else if (typeof questionWordsChinese === 'string') {
    cmp = <div>{questionWordsChinese}</div>;
  }
  return cmp;
};

const TranslationToolip: React.FC<Props> = (props: Props) => {
  const { title, children, toolTipWidth, isOpen, clickCallback, questionIndex, style } = props;
  let showText = '';
  if (Array.isArray(children)) {
    showText = children.join('');
  } else if (typeof children === 'string') {
    showText = children;
  }

  return (
    <Tooltip
      title={<WordTranslation questionWordsChinese={title} />}
      trigger='click'
      overlayClassName={styles.tootip}
      overlayStyle={{ maxWidth: toolTipWidth }}
      placement='topLeft'
      open={isOpen}>
      <span
        style={style}
        className={cls(styles.phase, { [styles.activePhase]: isOpen })}
        dangerouslySetInnerHTML={{ __html: showText }}
        onClick={(event) => {
          clickCallback?.(event, title, showText, questionIndex);
        }}></span>
    </Tooltip>
  );
};

export default TranslationToolip;
