import React, { memo, Suspense, useEffect, useMemo, useState } from 'react';
import { Radio, Tooltip, Tag, Button, Switch } from 'antd';
import cls from 'classnames';

import { WtsRadio } from '@/components/wts-radios';

import styles from './styles.module.scss';
import { findGrayIndex, useGetAllSelected } from '@/utils/useGetAllSelected';
import { indexToOption, isCorrect, isWrong } from '@/utils';
import AnswerAnalysis from '@/components/answer-analysis';

interface Props {
  questionWords?: any;
  questionIndex?: any;
  questionWordsChinese?: any;
  setActiveWord?: any;
  activeWord?: any;
  clickCallback?: any;
  allSelected?: any; //用户作答
  setAllSelected?: any;
  wrongOptions: any; //判卷结果
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
    wrongOptions,
  } = props;

  const [select, setSelect] = useState();
  const [showTranslation, setShowTranslation] = useState(false); //是否展示所有选项的翻译

  useGetAllSelected({ allSelected, setAllSelected, questionIndex, selected: select });

  useEffect(() => {
    if (typeof select != 'number') return;
    let questionDom = document.getElementById(String(questionIndex));
    questionDom.innerText = `${questionIndex}.${questionWords[select as number]}`;
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
                grayIndex={findGrayIndex(allSelected, index, wrongOptions)}
                disabled={wrongOptions}
                correct={isCorrect(wrongOptions, index)}
                wrong={isWrong(wrongOptions, index)}
              />
            </div>
          );
        })}
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
      <AnswerAnalysis wrongOptions={wrongOptions} />
    </div>
  );
};

export default QuestionCard;

{
  /* <i></i>
<i></i>
<i></i>
<i></i>
<i></i> */
}
