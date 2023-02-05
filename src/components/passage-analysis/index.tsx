import React from 'react';
import cls from 'classnames';
import styles from './styles.module.scss';

interface Props {
  translation: any; //中文数组
  jugementResult: any; //判卷结果 {passage_abstract，important_words}
}
const PassageAnalysis: React.FC<Props> = (props) => {
  const { translation, jugementResult } = props;
  return (
    <div className={styles.container}>
      {translation ? (
        <div className={styles.translationText}>
          <div className={styles.translationTitle}>参考译文</div>
          {translation.map((item) => {
            return <div dangerouslySetInnerHTML={{ __html: item }}></div>;
          })}
        </div>
      ) : null}
      {jugementResult?.passage_abstract ? (
        <div className={styles.translationText}>
          <div className={styles.translationTitle}>材料分析</div>
          <div>{jugementResult?.passage_abstract}</div>
        </div>
      ) : null}
      {jugementResult?.important_words ? (
        <div className={styles.translationText}>
          <div className={styles.translationTitle}>重点单词</div>
          <div>
            {jugementResult?.important_words.map((item) => {
              return <div>{item}</div>;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PassageAnalysis;
