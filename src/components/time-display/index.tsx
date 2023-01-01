// 原作者：https://blog.csdn.net/tovinping/article/details/98475572

import React, { Component, useEffect, useState } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Tooltip, Button } from 'antd';

interface Props {
  time?: any;
  initalTime?: any;
  showTime?: any;
}
interface State {
  time?: any;
  isShow?: any;
}

const TimeDisplay: React.FC<Props> = (props: Props) => {
  const [time, setTime] = useState(props.initalTime ? props.initalTime : 3580);
  const [isShow, setIsShow] = useState(true);

  let myInterval = null;
  const interval = () => {
    myInterval = setTimeout(() => {
      setTime(time + 1);
    }, 1000);
  };
  interval();

  //失败的案例，每次获取的time都是首次渲染时的time，永远是0
  //   useEffect(() => {
  //     setInterval(() => {
  //       console.log('当前time是', time);
  //       setTime(time + 1);
  //     }, 1000);
  //   }, []);

  const appendZero = (n: number) => {
    if (n < 10) {
      return '0' + n.toString();
    } else {
      return n;
    }
    return n;
  };

  const formateTime = (t = 0) => {
    // const msec = appendZero(Number.parseInt(t % 100));
    // const sec = appendZero((t / 100) % 60);
    // const min = appendZero((t / 6000) % 60);
    // const hour = this.appendZero(Number.parseInt(t/360000));

    const hour = appendZero(parseInt((t / 3600).toString()));
    const sec = appendZero(t % 60);
    const min = appendZero(parseInt(((t / 60) % 60).toString()));
    return `${hour}:${min}:${sec}`;
  };

  const changeStatus = () => {
    setIsShow(!isShow);
  };

  return (
    // <Tooltip title='显示/隐藏时间'>
    //   {isShow ? (
    //     <div
    //       className={styles.timeWrapper}
    //       onClick={() => {
    //         changeStatus();
    //       }}>
    //       <ClockCircleOutlined style={{ color: 'red' }} />
    //       <div className={styles.timeText}>{formateTime(time)}</div>
    //     </div>
    //   ) : (
    //     <div
    //       className={styles.timeWrapperOnlyPic}
    //       onClick={() => {
    //         changeStatus();
    //       }}>
    //       <ClockCircleOutlined />
    //     </div>
    //   )}
    // </Tooltip>
    <Tooltip title='显示/隐藏时间'>
      <div
        className={styles.timeWrapper}
        onClick={() => {
          changeStatus();
        }}>
        <ClockCircleOutlined />
        {isShow ? <div className={styles.timeText}>{formateTime(time)}</div> : null}
      </div>
    </Tooltip>
  );
};

export default TimeDisplay;
