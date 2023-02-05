import Item from 'antd/es/list/Item';
import React, { memo, Suspense, useEffect, useMemo, useState } from 'react';
import { Radio, Tooltip, Tag, Switch } from 'antd';
import cls from 'classnames';

import TranslationToolip from '@/components/translation-tooltip';
import { WtsRadio } from '@/components/wts-radios';

import styles from './styles.module.scss';
import { useGetAllSelected } from '@/utils/useGetAllSelected';
import classNames from 'classnames';
import { isCorrect, isSelected, isWrong } from '@/utils';
import AnswerAnalysis from '@/components/answer-analysis';

interface Props {
  // question: any;
  questionIndex?: any;
  questionEnglish?: any;
  questionChinese?: any;
  optionsEnglish: any;
  optionsChinese: any;
  clickCallback: any;
  wrongOptions: any;
  setActiveSentence: any;
  activeSentence: any;
  setAllSelected: any; //设置用户作答
  allSelected: any; //用户作答
}
const indexToOption = (index) => {
  if (index === 0) {
    return 'A';
  } else if (index === 1) {
    return 'B';
  } else if (index === 2) {
    return 'C';
  } else if (index === 3) {
    return 'D';
  }
};
const QuestionCard: React.FC<Props> = (props) => {
  const {
    questionIndex,
    questionEnglish,
    questionChinese,
    optionsEnglish,
    optionsChinese,
    clickCallback,
    wrongOptions,
    setActiveSentence,
    activeSentence,
    setAllSelected,
    allSelected,
  } = props;
  const [selected, setSelected] = useState(); //选了哪个选项
  const [showTranslation, setShowTranslation] = useState(false); //是否展示所有选项的翻译

  useGetAllSelected({ allSelected, setAllSelected, questionIndex, selected });

  const toolTipWidth = useMemo(() => {
    return document.getElementById('questionEnglishId')?.offsetWidth - 50;
  }, [props]);

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionEnglish} id='questionEnglishId'>
        <TranslationToolip
          title={questionChinese}
          toolTipWidth={toolTipWidth}
          isOpen={questionChinese === activeSentence}
          clickCallback={clickCallback}>
          第{questionIndex}题
        </TranslationToolip>
        {!wrongOptions ? (
          <div className={styles.switch}>
            <Switch
              checkedChildren='关'
              unCheckedChildren='译'
              onClick={() => {
                setShowTranslation(!showTranslation);
              }}
            />
          </div>
        ) : null}
      </div>
      {optionsEnglish.map((item, index) => {
        return (
          <div
            className={cls(styles.item, {
              [styles.selected]: isSelected(index, selected, wrongOptions),
            })}>
            <WtsRadio
              questionIndex={questionIndex}
              optionIndex={index}
              sentense={item}
              selected={selected === index}
              setSelect={setSelected}
              activeTooltip={activeSentence}
              chinese={optionsChinese[index]}
              clickCallback={clickCallback}
              showSecondLineTranslation={showTranslation}
              disabled={wrongOptions}
              correct={isCorrect(wrongOptions, index)}
              wrong={isWrong(wrongOptions, index)}
            />
          </div>
        );
      })}
      <AnswerAnalysis wrongOptions={wrongOptions} questionChinese={questionChinese} optionsChinese={optionsChinese} />
    </div>
  );
};

export default QuestionCard;
