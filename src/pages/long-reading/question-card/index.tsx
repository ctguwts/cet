import React, { memo, Suspense, useEffect, useMemo, useState } from 'react';
import { Radio, Tooltip, Tag, Button, Switch } from 'antd';
import cls from 'classnames';

import { WtsRadio } from '@/components/wts-radios';

import styles from './styles.module.scss';
import { findGrayIndex, useGetAllSelected } from '@/utils/useGetAllSelected';
import { indexToOption, isCorrect, isWrong } from '@/utils';
import AnswerAnalysis from '@/components/answer-analysis';
import TranslationToolip from '@/components/translation-tooltip';

interface Props {
  questionSentences?: any; //题干英文
  questionIndex?: any; //题目编号
  questionSentencesChinese?: any; //题干中文
  options?: any; //每一题的选项
  setActiveTooltip?: any;
  activeTooltip?: any;
  clickCallback?: any;
  allSelected?: any; //用户作答
  setAllSelected?: any;
  wrongOptions: any; //判卷结果
}

const QuestionCard: React.FC<Props> = (props) => {
  const {
    questionSentences,
    questionIndex,
    questionSentencesChinese,
    options,
    setActiveTooltip,
    activeTooltip,
    clickCallback,
    allSelected,
    setAllSelected,
    wrongOptions,
  } = props;

  const [select, setSelect] = useState();

  const toolTipWidth = useMemo(() => {
    return document.getElementById('questionEnglishId')?.offsetWidth - 50;
  }, [props]);

  return (
    <div className={styles.questionCard}>
      <div className={styles.title} id='questionEnglishId'>
        <TranslationToolip
          title={questionSentencesChinese}
          toolTipWidth={toolTipWidth}
          isOpen={questionSentencesChinese === activeTooltip}
          clickCallback={clickCallback}
          style={{ fontSize: '18px', lineHeight: '28px' }}>
          {questionIndex}.{questionSentences}
        </TranslationToolip>
      </div>
      <div className={styles.opetionArea}>
        {options.map((item, index) => {
          return (
            <div className={styles.wordWrapper}>
              <WtsRadio
                questionIndex={questionIndex}
                optionIndex={index}
                // sentense={item}
                selected={select === index}
                setSelect={setSelect}
                activeTooltip={activeTooltip}
                // chinese={questionSentencesChinese[index]}
                clickCallback={clickCallback}
                // showSecondLineTranslation={showTranslation}
                // grayIndex={findGrayIndex(allSelected, index, wrongOptions)}
                disabled={wrongOptions}
                correct={isCorrect(wrongOptions, index)}
                wrong={isWrong(wrongOptions, index)}
              />
            </div>
          );
        })}
        <i style={{ minWidth: '50px' }}></i>
        <i style={{ minWidth: '50px' }}></i>
        <i style={{ minWidth: '50px' }}></i>
        <i style={{ minWidth: '50px' }}></i>
        <i style={{ minWidth: '50px' }}></i>
        <i style={{ minWidth: '50px' }}></i>
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
