import Item from 'antd/es/list/Item';
import React, { memo, Suspense, useMemo, useState } from 'react';
import { Radio, Tooltip, Tag } from 'antd';
import cls from 'classnames';

import TranslationToolip from '@/components/translation-tooltip';

import styles from './styles.module.scss';

interface Props {
  question: any;
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
  const { questionIndex, questionEnglish, questionChinese, optionsEnglish, optionsChinese, clickCallback, isOpen, wrongOptions } = props.question;
  const [selected, setSelected] = useState();

  const onChange = (value) => {
    console.log('您选择了', value?.target.value);
    setSelected(value?.target.value);
  };

  const toolTipWidth = useMemo(() => {
    return document.getElementById('questionEnglishId')?.offsetWidth - 50;
  }, [props.question]);

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionEnglish} id='questionEnglishId'>
        <TranslationToolip title={questionChinese} toolTipWidth={toolTipWidth} isOpen={isOpen} clickCallback={clickCallback}>
          {questionIndex}.{questionEnglish}
        </TranslationToolip>
      </div>
      {!wrongOptions ? (
        <div className={styles.options}>
          <Radio.Group onChange={onChange}>
            {optionsEnglish.map((item, index) => {
              return (
                <div className={cls(styles.item, { [styles.selected]: index === selected })}>
                  <Radio value={index}>
                    {indexToOption(index)}. {item}
                  </Radio>
                </div>
              );
            })}
          </Radio.Group>
        </div>
      ) : (
        <div className={styles.wrongOptions}>
          <Radio.Group onChange={onChange}>
            {optionsEnglish.map((item, index) => {
              return (
                <div
                  className={cls(
                    styles.item,
                    { [styles.wrong]: wrongOptions.your_answer === index && wrongOptions.correct_answer !== wrongOptions.your_answer },
                    { [styles.correct]: wrongOptions.your_answer === index && wrongOptions.correct_answer === wrongOptions.your_answer },
                  )}>
                  <Radio value={index} disabled={true}>
                    {indexToOption(index)}. {item}
                  </Radio>
                </div>
              );
            })}
          </Radio.Group>
        </div>
      )}
      <div className={styles.analysisWrapper}>
        {wrongOptions ? (
          <div className={styles.analysis}>
            <div className={styles.box}>
              <div className={styles.tag}>
                <Tag color='volcano'>正确答案</Tag>
              </div>
              <div className={styles.text}>
                你的选择:{indexToOption(wrongOptions.your_answer)} 正确选项:{indexToOption(wrongOptions.correct_answer)}
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.tag}>
                <Tag color='orange'>答案解析</Tag>
              </div>
              <div className={styles.text} dangerouslySetInnerHTML={{ __html: wrongOptions.analysis }} />
            </div>
            <div className={styles.box}>
              <div className={styles.tag}>
                <Tag color='green'>干扰项分析</Tag>
              </div>
              <div className={styles.text}>{wrongOptions.interference}</div>
            </div>
            <div className={styles.box}>
              <div className={styles.tag}>
                <Tag color='geekblue'>题干翻译</Tag>
              </div>
              <div className={styles.text}>{questionChinese}</div>
            </div>
            <div className={styles.box}>
              <div className={styles.tag}>
                <Tag color='purple'>选项翻译</Tag>
              </div>
              <div className={styles.text}>
                {optionsChinese.map((item, index) => {
                  return (
                    <div>
                      {indexToOption(index)}.{item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default QuestionCard;
