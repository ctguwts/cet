import React, { CSSProperties, memo, Suspense, useEffect, useState } from 'react';
import { Input, Space } from 'antd';
import { CloseOutlined, SoundTwoTone } from '@ant-design/icons';
import { Point } from '@/const/types';
import cls from 'classnames';
import styles from './styles.module.scss';
import axios from 'axios';

import { StarFilled, StarOutlined, InfoCircleOutlined } from '@ant-design/icons';

interface Props {
  mousePoint?: Point;
  word?: string;
  closeWordTranslationBox?: () => void;
  curEnglishText?: string; //当前被点击的英文
  curTranslation?: string; //当前被点击的句子的翻译
}

//获取盒子的起始坐标，mousePoint是鼠标坐标， boxWidth是盒子宽度 boxHeight是盒子高度
const computeBoxStartPoint = (mousePoint, boxWidth, boxHeight) => {
  let computedMousePoint = { x: mousePoint.x, y: mousePoint.y };
  if (computedMousePoint.x + boxWidth > window.innerWidth || computedMousePoint.y + boxHeight > window.innerHeight) {
    if (computedMousePoint.x + boxWidth > window.innerWidth && computedMousePoint.y + boxHeight > window.innerHeight) {
      //如果盒子右侧超出浏览器右侧，且盒子底部超出浏览器底部
      computedMousePoint = { x: computedMousePoint.x - boxWidth, y: computedMousePoint.y - boxHeight };
    } else if (mousePoint.x + boxWidth > window.innerWidth) {
      //如果盒子右侧超出浏览器右侧，但盒子底部没有超出浏览器底部
      computedMousePoint = { x: computedMousePoint.x - boxWidth, y: computedMousePoint.y };
    } else if (mousePoint.y + 361 > window.innerHeight) {
      //如果盒子右侧没有超出浏览器右侧，盒子底部超出浏览器底部
      computedMousePoint = { x: computedMousePoint.x, y: computedMousePoint.y - boxHeight };
    }
  }
  return computedMousePoint;
};
const WordTranslationBox: React.FC<Props> = (props) => {
  const { mousePoint, word, closeWordTranslationBox, curEnglishText, curTranslation } = props;
  const [computedMousePoint, setComputedMousePoint] = useState<Point>(mousePoint);
  const { Search } = Input;

  useEffect(() => {
    setComputedMousePoint(computeBoxStartPoint(mousePoint, 300, 361));
  }, [mousePoint]);
  console.log('computedMousePoint点是', computedMousePoint);

  useEffect(() => {
    axios
      .get(
        'http://top.zhan.com/vocab/vocabulary/trans.html?word=coat&en_dom=The+seed+coat+is+thin%2C+meaning+that+birds+such+as+pinyon+jays+can+not+only+ingest+the+seeds+but+also+digest+them.+',
      )
      .then(function (response) {
        console.log(response); //请求正确时执行的代码
      })
      .catch(function (response) {
        console.log('失败', response); //发生错误时执行的代码
      });
  }, []);

  return (
    <div className={styles.wordTranslationBox} style={{ left: computedMousePoint.x, top: computedMousePoint.y }}>
      <div className={styles.header}>
        <Search placeholder='请输入你要搜索的单词' style={{ width: 220 }} />
        <CloseOutlined
          className={styles.closeButton}
          onClick={() => {
            closeWordTranslationBox();
          }}
        />
      </div>
      <div className={styles.scrollContent}>
        <div className={styles.word}>{word}</div>
        <div className={styles.phonetic}>
          <div className={styles.text}>美['pɔɪzənəs]</div>
          <SoundTwoTone className={styles.sound} />
        </div>
        <div className={styles.translation}>n. 种子(seed的第三人称单数 , 复数)</div>
        <div className={styles.sentence}>
          <div className={styles.title}>原文例句</div>
          <div className={styles.content}>{`${curEnglishText}\n \n${curTranslation}`}</div>

          <div className={styles.title}>其他例句</div>
          <div className={styles.content}>{`In many plants, an indigestible seed coat permits the seed to pass unharmed through the bird’s alimentary system.

在许多植物中，无法消化的种子皮使种子不受伤害地通过鸟类的消化系统。`}</div>
        </div>
        {/* 站位用，高度等同于bottomArea，把内容顶上去,bottomAreaEmpty永远是scrollConetent的底部 */}
        <div className={styles.bottomAreaEmpty}></div>
      </div>
      <div className={styles.bottomArea}>
        <div className={styles.cssMask}></div>
        <div className={styles.buttonGroup}>
          <div className={styles.button}>
            {/* <StarFilled /> */}
            <StarOutlined style={{ marginRight: '5px' }} />
            加入生词
          </div>
          <div className={styles.button}>
            <InfoCircleOutlined style={{ marginRight: '5px' }} />
            详细释义
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordTranslationBox;
