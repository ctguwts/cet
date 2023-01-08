import React, { memo, Suspense, useEffect, useMemo, useState } from 'react';
import { Radio, Tooltip, Tag, Button, Switch } from 'antd';
import cls from 'classnames';

import { WtsRadio } from '@/components/wts-radios';

import styles from './styles.module.scss';
import { findGrayIndex, useGetAllSelected } from '@/utils/useGetAllSelected';

interface Props {
  questionWords?: any;
  questionIndex?: any;
  questionWordsChinese?: any;
  setActiveWord?: any;
  activeWord?: any;
  clickCallback?: any;
  allSelected?: any; //用户作答
  setAllSelected?: any;
}

const QuestionCard: React.FC<Props> = (props) => {
  const {
    questionWords,
    questionIndex,
    questionWordsChinese,
    setActiveWord,
    activeWord,
    clickCallback,
    allSelected,
    setAllSelected,
  } = props;

  const [select, setSelect] = useState();
  const [showTranslation, setShowTranslation] = useState(false); //是否展示所有选项的翻译

  useGetAllSelected({ allSelected, setAllSelected, questionIndex, selected: select });

  useEffect(() => {
    console.log('你改变了选项', select);
    if (typeof select != 'number') return;
    let questionDom = document.getElementById(String(questionIndex));
    questionDom.innerText = `${questionIndex}.${questionWords[select as number]}`;
    console.log(document.getElementById(String(questionIndex)));
  }, [select]);

  return (
    <div className={styles.questionCard}>
      <div className={styles.title}>
        <div className={styles.text}>第{questionIndex}题</div>
        <div
          onClick={() => {
            setShowTranslation(!showTranslation);
          }}>
          <Switch checkedChildren='关' unCheckedChildren='译' />
        </div>
      </div>
      <div className={styles.opetionArea}>
        {questionWords.map((item, index) => {
          return (
            <div className={styles.wordWrapper}>
              <WtsRadio
                questionIndex={questionIndex}
                optionIndex={index}
                sentense={item}
                selected={select === index}
                setSelect={setSelect}
                activeTooltip={activeWord}
                chinese={questionWordsChinese[index]}
                clickCallback={clickCallback}
                showSecondLineTranslation={showTranslation}
                grayIndex={findGrayIndex(allSelected, index)}
              />
            </div>
          );
        })}
        {/* i是为了在flex布局下，最后一行填满元素 */}
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  );
};

export default QuestionCard;
