import React, { memo, Suspense, useMemo } from 'react';
import cls from 'classnames';

import TranslationToolip from '../translation-tooltip';

import styles from './styles.module.scss';

interface TranslationProps {
  chinese: any;
}

interface RadioProps {
  questionIndex?: any; //问题的序号:例如51题
  optionIndex?: any; //选项的序号：例如 0,1,2,3 分别表示ABCD
  sentense?: any; //英文句子 或者 英文单词
  selected?: any; // 该题选择了哪一项
  setSelect?: any; //设置选项
  activeTooltip?: any; //当前显示哪个tooltip
  chinese?: any; //中文翻译 string 或 Array
  disabled?: boolean; //是否禁用按钮
  clickCallback?: any; //判断是框选单词 还是 点击句子
  showSecondLineTranslation?: any;
  grayIndex?: any; //灰色选项，表示被选过。index表示第几题选了该按钮
  correct?: any; //true表示已经交卷，且正确
  wrong?: any; //true表示已经交卷，且错误
}

const indexToOption = (index) => {
  const map = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
  return map[index];
};

const SecondLineTrans = (props) => {
  const { chinese } = props;
  let cmp = null;
  if (Array.isArray(chinese)) {
    cmp = chinese?.map((item) => {
      return <div className={styles.box}>{item}</div>;
    });
  } else if (typeof chinese === 'string') {
    return <div className={styles.boxSentence}>{chinese}</div>;
  }
  return cmp;
};

export const WtsRadio: React.FC<RadioProps> = (props: RadioProps) => {
  const {
    questionIndex,
    optionIndex,
    sentense,
    selected,
    setSelect,
    activeTooltip,
    chinese,
    disabled,
    clickCallback,
    showSecondLineTranslation,
    grayIndex,
    correct,
    wrong,
  } = props;
  const toolTipWidth = useMemo(() => {
    return Math.max(document.getElementById(chinese)?.offsetWidth, 300);
  }, [activeTooltip]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.item} key={questionIndex + sentense}>
        <div
          className={cls(
            styles.circleBase,
            { [styles.circle]: !selected && !grayIndex },
            { [styles.circleGray]: !selected && grayIndex },
            { [styles.activeCircle]: selected && !correct && !wrong },
            { [styles.correct]: correct },
            { [styles.wrong]: wrong },
          )}
          onClick={() => {
            if (disabled) {
              return;
            }
            setSelect(optionIndex);
          }}>
          {indexToOption(optionIndex)}
          {grayIndex && !selected ? <div className={styles.questionNumber}>{grayIndex}</div> : null}
        </div>
        <div id={chinese} className={cls(styles.text, { [styles.textCorrect]: correct, [styles.textWrong]: wrong })}>
          <TranslationToolip
            isOpen={activeTooltip === questionIndex + chinese}
            // title={<WordTranslation chinese={chinese} />}
            title={chinese}
            questionIndex={questionIndex}
            toolTipWidth={toolTipWidth}
            clickCallback={clickCallback}>
            {sentense}
          </TranslationToolip>
        </div>
      </div>
      {showSecondLineTranslation ? (
        <div className={styles.secondLineTranslation}>
          <SecondLineTrans chinese={chinese} />
        </div>
      ) : null}
    </div>
  );
};
