import React from 'react';
import { Tag } from 'antd';
import cls from 'classnames';
import styles from './styles.module.scss';
import { indexToOption } from '@/utils';

interface Props {
  wrongOptions?: any;
  questionChinese?: any;
  optionsChinese?: any;
}
const AnswerAnalysis: React.FC<Props> = (props) => {
  const { wrongOptions, questionChinese, optionsChinese } = props;
  return (
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
          {wrongOptions?.tyzd ? (
            <div className={styles.box}>
              <div className={styles.tag}>
                <Tag color='green'>听音重点</Tag>
              </div>
              <div className={styles.text}>{wrongOptions?.tyzd}</div>
            </div>
          ) : null}
          {wrongOptions?.interference ? (
            <div className={styles.box}>
              <div className={styles.tag}>
                <Tag color='green'>干扰项分析</Tag>
              </div>
              <div className={styles.text}>{wrongOptions.interference}</div>
            </div>
          ) : null}
          {questionChinese ? (
            <div className={styles.box}>
              <div className={styles.tag}>
                <Tag color='geekblue'>题干翻译</Tag>
              </div>
              <div className={styles.text}>{questionChinese}</div>
            </div>
          ) : null}
          {optionsChinese ? (
            <div className={styles.box}>
              <div className={styles.tag}>
                <Tag color='purple'>选项翻译</Tag>
              </div>
              <div className={styles.text}>
                {optionsChinese?.map((item, index) => {
                  return (
                    <div>
                      {indexToOption(index)}.{item}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default AnswerAnalysis;
