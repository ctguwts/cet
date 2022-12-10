import React, { CSSProperties, memo, Suspense } from 'react';
import cls from 'classnames';
import styles from './styles.module.scss';

interface Props {
  text?: string; //按钮中的文字
  style?: string; //按钮样式,本质是classname
}
const RoundedButton: React.FC<Props> = (props) => {
  const { text, style } = props;

  return (
    <div className={cls(styles.roundedButton, style)}>{text ?? `提交`}</div>
  );
};

export default RoundedButton;
