import Item from 'antd/es/list/Item';
import React, { memo, Suspense, useEffect, useMemo, useState } from 'react';
import { Radio, Tooltip, Tag } from 'antd';
import cls from 'classnames';

import TranslationToolip from '@/components/translation-tooltip';
import { WtsRadio } from '@/components/wts-radios';

import styles from './styles.module.scss';

interface Props {
  // question: any;
  questionIndex: any;
  questionEnglish: any;
  questionChinese: any;
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

  useEffect(() => {
    let beforeIndex = null;
    //该题之前是否答过
    for (let index = 0; index < allSelected.length; index++) {
      if (allSelected[index].questionIndex === questionIndex) {
        beforeIndex = index;
      }
    }
    //如果之前回答过，先删除之前的答案
    let tmpList = allSelected;
    if (beforeIndex !== null) {
      tmpList.splice(beforeIndex, 1);
    }
    //把当前答案存入数组
    tmpList.push({
      questionIndex: questionIndex,
      option: selected,
    });
    console.log('更新列表', tmpList);
    setAllSelected(tmpList);
  }, [selected]);

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
          {questionIndex}.{questionEnglish}
        </TranslationToolip>
      </div>
      {!wrongOptions ? (
        // <div className={styles.options}>
        //   <Radio.Group onChange={onChange}>
        //     {optionsEnglish.map((item, index) => {
        //       return (
        //         <div className={cls(styles.item, { [styles.selected]: index === selected })}>
        //           <Radio value={index}>
        //             {indexToOption(index)}. {item}
        //           </Radio>
        //         </div>
        //       );
        //     })}
        //   </Radio.Group>
        // </div>
        optionsEnglish.map((item, index) => {
          return (
            <div
              className={cls(styles.item, {
                [styles.selected]: index === selected,
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
              />
            </div>
          );
        })
      ) : (
        <div className={styles.wrongOptions}>
          {optionsEnglish.map((item, index) => {
            return (
              <div
                className={cls(
                  styles.item,
                  {
                    [styles.wrong]:
                      wrongOptions.your_answer === index && wrongOptions.correct_answer !== wrongOptions.your_answer,
                  },
                  {
                    [styles.correct]:
                      wrongOptions.your_answer === index && wrongOptions.correct_answer === wrongOptions.your_answer,
                  },
                )}>
                <WtsRadio
                  questionIndex={questionIndex}
                  optionIndex={index}
                  sentense={item}
                  selected={selected === index}
                  setSelect={setSelected}
                  activeTooltip={activeSentence}
                  chinese={optionsChinese[index]}
                  clickCallback={clickCallback}
                  disabled
                />
              </div>
            );
          })}
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
                你的选择:
                {indexToOption(wrongOptions.your_answer)} 正确选项:
                {indexToOption(wrongOptions.correct_answer)}
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.tag}>
                <Tag color='orange'>答案解析</Tag>
              </div>
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{
                  __html: wrongOptions.analysis,
                }}
              />
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
