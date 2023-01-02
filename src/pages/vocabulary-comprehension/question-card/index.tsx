import Item from 'antd/es/list/Item';
import React, { memo, Suspense, useMemo, useState } from 'react';
import { Radio, Tooltip, Tag, Button } from 'antd';
import cls from 'classnames';

import TranslationToolip from '@/components/translation-tooltip';

import styles from './styles.module.scss';

interface Props {
  questionWords?: any;
  questionIndex?: any;
  questionWordsChinese?: any;
  setActiveWord?: any;
  activeWord?: any;
}
interface TranslationProps {
  questionWordsChinese: any;
}
const indexToOption = (index) => {
  const map = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
  return map[index];
};

const WordTranslation: React.FC<TranslationProps> = (props: TranslationProps) => {
  const { questionWordsChinese } = props;
  return (
    <>
      {questionWordsChinese.map((item) => {
        return <div>{item}</div>;
      })}
    </>
  );
};
const QuestionCard: React.FC<Props> = (props) => {
  const { questionWords, questionIndex, questionWordsChinese, setActiveWord, activeWord } = props;

  const [select, setSelect] = useState();

  return (
    <div className={styles.questionCard}>
      <div className={styles.title}>第{questionIndex}题</div>
      <div className={styles.opetionArea}>
        {questionWords.map((item, index) => {
          return (
            <div className={styles.item} key={questionIndex + item}>
              <div
                className={cls({ [styles.circle]: index !== select }, { [styles.activeCircle]: index === select })}
                onClick={() => {
                  setSelect(index);
                }}>
                {indexToOption(index)}
              </div>
              <div
                className={styles.text}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveWord(questionIndex + item);
                }}>
                <TranslationToolip isOpen={activeWord === questionIndex + item} title={<WordTranslation questionWordsChinese={questionWordsChinese[index]} />}>
                  {item}
                </TranslationToolip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
