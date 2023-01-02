import React, { CSSProperties, memo, Suspense, useState, useMemo } from 'react';
import cls from 'classnames';
import { Tooltip, Divider, Modal } from 'antd';

import WordTranslationBox from '@/components/word-translation-box';
import { getSelectionWord } from '@/utils';
import { Point } from '@/const/types';
import {
  reading_detail_example_new,
  reading_detail_translation_text,
  reading_question_english,
  reading_question_chinese,
  reading_index,
  reading_options_english,
  reading_options_chinese,
  jugement_result,
} from '@/mock-data/data';
import QuestionCard from './question-card';
import TranslationToolip from '@/components/translation-tooltip';
import ExamTopBar from '@/components/exam-top-bar';
import { useJudgementResultModal } from '@/components/judgement-result-modal';
import ReadingWrapper from '@/components/reading-wrapper';

import styles from './styles.module.scss';

interface Props {}

const ReadingDetail: React.FC<Props> = (props) => {
  const [mousePoint, setMousePoint] = useState<Point>(null as Point);
  const [selectedWord, setSelectedWord] = useState();
  //当前被点击的英文句子文本，以及翻译
  const [curTranslation, setCurTranslation] = useState();
  const [curEnglishText, setCurEnglishText] = useState();

  //判卷结果
  const [jugementResult, setJudgementResult] = useState<any>();

  //当前需要ToolTip的句子
  const [activeTooltip, setActiveTooltip] = useState('在许多植物中，无法消化的种子皮使种子不受伤害地通过鸟类的消化系统。');

  const { judgementResultModal, closeModal: closeJudgementResultModal, openModal: openJudgementResultModal } = useJudgementResultModal();

  const callback = (event, chinese, english) => {
    event.stopPropagation();
    setCurTranslation(chinese);
    setCurEnglishText(english);

    const { anchorNode, anchorOffset, focusNode, type } = window.getSelection();

    if (type != 'Range') {
      //如果不是range，不是选中单词，那么就是点击段落，直接弹出改段落的翻译
      // const parentNode = anchorNode.parentNode;
      // if (parentNode.nodeType === 1) {
      //   const dataset = (parentNode as any).dataset;
      //   console.log('当前是段落翻译', dataset.translation);
      //   setActiveTooltip(dataset.translation);
      // }
      setSelectedWord(null);
      setActiveTooltip(chinese);
      return;
    }
    setActiveTooltip(null);
    setSelectedWord(getSelectionWord(anchorNode.textContent, anchorOffset));
    setMousePoint({ x: event.clientX, y: event.clientY });
    console.log('当前是选中单词', selectedWord, event.clientX, event.clientY);
  };

  const clickOuter = () => {
    setSelectedWord(null);
    setActiveTooltip(null);
    //清空鼠标选中内容
    window.getSelection().removeAllRanges();
  };

  const closeWordTranslationBox = () => {
    setSelectedWord(null);
  };

  //点击确认交卷后，处理函数
  const okHandler = () => {
    //此处发起网络请求，把答案提交给后端
    console.log('提交，提交网络请求');
    setJudgementResult(jugement_result);
    openJudgementResultModal();
  };

  const toolTipWidth = useMemo(() => {
    return document.getElementById('reading_detail_content')?.offsetWidth;
  }, [activeTooltip]);

  return (
    <ReadingWrapper clickOuter={clickOuter} okHandler={okHandler} topBarTitle='2022年卷二仔细阅读21'>
      <div>
        {reading_question_english.map((_, index) => {
          return (
            <QuestionCard
              question={{
                questionIndex: reading_index[index],
                questionEnglish: reading_question_english[index],
                questionChinese: reading_question_chinese[index],
                optionsEnglish: reading_options_english[index],
                optionsChinese: reading_options_chinese[index],
                setActiveSentence: (sentence) => {
                  setActiveTooltip(sentence);
                },
                isOpen: reading_question_chinese[index] === activeTooltip,
                clickCallback: callback,
                wrongOptions: jugementResult?.options[index],
              }}
            />
          );
        })}
      </div>
      <div>
        <div className={styles.content} id='reading_detail_content'>
          {reading_detail_example_new?.chinese.map((item, index) => {
            return (
              <TranslationToolip
                title={reading_detail_example_new?.chinese[index]}
                toolTipWidth={toolTipWidth}
                isOpen={reading_detail_example_new?.chinese[index] === activeTooltip}
                clickCallback={callback}>
                {reading_detail_example_new?.english[index]}
              </TranslationToolip>
            );
          })}
        </div>
        {jugementResult ? (
          <>
            <div className={styles.translationText}>
              <div className={styles.translationTitle}>参考译文</div>
              {reading_detail_translation_text.map((item) => {
                return <div dangerouslySetInnerHTML={{ __html: item }}></div>;
              })}
            </div>
            <div className={styles.translationText}>
              <div className={styles.translationTitle}>材料分析</div>
              <div>{jugementResult?.passage_abstract}</div>
            </div>
            <div className={styles.translationText}>
              <div className={styles.translationTitle}>重点单词</div>
              <div>
                {jugementResult?.important_words.map((item) => {
                  return <div>{item}</div>;
                })}
              </div>
            </div>
          </>
        ) : null}
        {selectedWord ? (
          <WordTranslationBox
            mousePoint={mousePoint}
            word={selectedWord}
            closeWordTranslationBox={closeWordTranslationBox}
            curTranslation={curTranslation}
            curEnglishText={curEnglishText}
          />
        ) : null}
        {judgementResultModal}
      </div>
    </ReadingWrapper>
    // <div className={styles.wrapper}>
    //   <ExamTopBar title='2022年卷二仔细阅读2' okHandler={okHandler} />
    //   <div
    //     className={styles.reading}
    //     onClick={() => {
    //       clickOuter();
    //     }}>
    //     <div className={styles.left}>
    //       <div className={styles.topRow}>
    //         <div>我是面包屑</div>
    //       </div>
    //       <Divider className={styles.divider} />
    //       <div
    //         className={styles.leftScrollConetnt}
    //         onScroll={() => {
    //           clickOuter();
    //         }}>
    //         {reading_question_english.map((_, index) => {
    //           return (
    //             <QuestionCard
    //               question={{
    //                 questionIndex: reading_index[index],
    //                 questionEnglish: reading_question_english[index],
    //                 questionChinese: reading_question_chinese[index],
    //                 optionsEnglish: reading_options_english[index],
    //                 optionsChinese: reading_options_chinese[index],
    //                 setActiveSentence: (sentence) => {
    //                   setActiveTooltip(sentence);
    //                 },
    //                 isOpen: reading_question_chinese[index] === activeTooltip,
    //                 clickCallback: callback,
    //                 wrongOptions: jugementResult?.options[index],
    //               }}
    //             />
    //           );
    //         })}
    //       </div>
    //     </div>
    //     <div
    //       className={styles.right}
    //       onScroll={() => {
    //         clickOuter();
    //       }}>
    //       <div className={styles.title}>
    //         <div className={styles.text}>仔细阅读</div>
    //       </div>
    //       <div className={styles.content} id='reading_detail_content'>
    //         {reading_detail_example_new?.chinese.map((item, index) => {
    //           return (
    //             <TranslationToolip
    //               title={reading_detail_example_new?.chinese[index]}
    //               toolTipWidth={toolTipWidth}
    //               isOpen={reading_detail_example_new?.chinese[index] === activeTooltip}
    //               clickCallback={callback}>
    //               {reading_detail_example_new?.english[index]}
    //             </TranslationToolip>
    //           );
    //         })}
    //       </div>
    //       {jugementResult ? (
    //         <>
    //           <div className={styles.translationText}>
    //             <div className={styles.translationTitle}>参考译文</div>
    //             {reading_detail_translation_text.map((item) => {
    //               return <div dangerouslySetInnerHTML={{ __html: item }}></div>;
    //             })}
    //           </div>
    //           <div className={styles.translationText}>
    //             <div className={styles.translationTitle}>材料分析</div>
    //             <div>{jugementResult?.passage_abstract}</div>
    //           </div>
    //           <div className={styles.translationText}>
    //             <div className={styles.translationTitle}>重点单词</div>
    //             <div>
    //               {jugementResult?.important_words.map((item) => {
    //                 return <div>{item}</div>;
    //               })}
    //             </div>
    //           </div>
    //         </>
    //       ) : null}
    //     </div>
    //   </div>
    //   {selectedWord ? (
    //     <WordTranslationBox
    //       mousePoint={mousePoint}
    //       word={selectedWord}
    //       closeWordTranslationBox={closeWordTranslationBox}
    //       curTranslation={curTranslation}
    //       curEnglishText={curEnglishText}
    //     />
    //   ) : null}
    //   {judgementResultModal}
    // </div>
  );
};

export default ReadingDetail;
