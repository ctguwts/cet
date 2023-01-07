import React, { CSSProperties, memo, Suspense, useState, useMemo, useEffect } from 'react';
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
import ExamTopBar from '@/components/exam-top-bar';
import { useJudgementResultModal } from '@/components/judgement-result-modal';
import ReadingWrapper from '@/components/reading-wrapper';

import styles from './styles.module.scss';
import TranslationToolip from '@/components/translation-tooltip';

const vocabulary_passage = {
  chinese: [
    '如果你在杂货店购物时看过配料表，你很可能看到过“天然香辛料”这个词',
    '但你有没有花时间想过这些天然香辛料到底是什么？',
    '<br></br>',
    '我们大多数人可能会认为“天然香辛料”自然对我们有好处',
    '《食欲》杂志最近的一项研究发现，当“天然”一词出现在包装上时，人们会认为里面的食物确实更健康',
    '事实上，至少从化学角度来说，天然香辛料与对应的增强风味的人造香辛料并没有太大区别',
    '这两种香辛料都可以在实验室里由训练有素的调味师制作，但人工香辛料使用化学物质使产品具有特定的气味或味道',
    '<br></br>',
    '天然香辛料来自植物或动物，如水果、蔬菜、肉、鱼或奶，然后以某种方式加工或精炼',
    '简而言之，天然香辛料是从植物和动物中提取的，为加工食品创造特定的味道',
    '但这未必会让你更容易分辨出食物中真正的成分',
    '由于美国食品和药品管理局（FDA）没有定义这个词，公司可以用它来指代几乎任何从植物或动物中提取的东西',
    '天然香辛料也可以包括各种化学添加剂，如防腐剂',
    'FDA并没有要求公司披露某个特定的产品中包含哪些额外的化学物质',
    '<br></br>',
    '所以，如果你想确切知道你买的东西是什么，你可能会想去农贸市场',
    '<br></br>',
  ],
  english: [
    'If you’ve ever <em>looked at</em> the ingredients list while grocery shopping, chances are you’ve seen the term “natural flavors”.',
    'But have you taken a <u id=26>26</u> to consider what these natural flavors actually are?',
    '<br></br>',
    'Most of us might think that “natural flavors” are, well, naturally good for us.',
    'A recent study in the journal Appetite found that when the word “natural” appears on packaging, people <u id=27>27</u> that the food within is indeed healthier.',
    'In truth, natural flavors do not <u id=28>28</u> much, <em>at least</em> chemically speaking, from their flavor-boosting <u id=29>29</u>: artificial flavors.',
    'Both can be made in a lab by trained flavorists, but artificial flavors use chemicals to give a product a <u id=30>30</u> smell or taste.',
    '<br></br>',
    'Natural flavors <em>come from</em> plant or animal <u id=31>31</u>, like fruit, vegetable, meat, fish or milk that is then processed or refined in some way.',
    '<em>In short</em>, natural flavors are <u id=32>32</u> from plants and animals to create specific flavors for processed foods.',
    'But that does not <u id=33>33</u> make it easier to tell what is really in your food.',
    'Because the Food and Drug Administration (FDA) has not <u id=34>34</u> the term, companies can use it to <em>refer to</em> pretty much anything <em>derived from</em> a plant or animal.',
    'And natural flavors can also include <em>a variety of</em> chemical additives, <em>such as</em> preservatives.',
    'The FDA doesn’t require companies to reveal what additional chemicals a specific item <u id=35>35</u>.',
    '<br></br>',
    'So if you want to know <em>for certain</em> what you’re getting with your groceries, you might want to <em>stick to</em> the farmer’s market.',
    '<br></br>',
    '<br></br>',
  ],
};

const question_words = [
  'acknowledge',
  'chance',
  'contains',
  'counterparts',
  'defined',
  'differ',
  'especially',
  'extracted',
  'implies',
  'necessarily',
  'particular',
  'perceive',
  'second',
  'sources',
  'strange',
];

const question_words_chinese = [
  ['v. 承认，感谢'],
  ['adj. 意外的，偶然的偶然的偶然的偶然的偶然的', 'n. 机会，可能性', 'v. 冒险，偶然发生'],
  ['v-s. 包含，容纳'],
  ['n-s. 职位或作用相当的人或物'],
  ['v-ed. 定义，解释'],
  ['v. 不同于，有区别'],
  ['adv. 尤其，特别'],
  ['v-ed. 提取，提炼'],
  ['v-s. 暗示，表明'],
  ['adv. 必然地'],
  ['adj. 特别的，格外的'],
  ['v. 感知，认为'],
  ['n. 秒，片刻', 'adj. 第二的', 'adv. 第二'],
  ['n-s. 来源', 'v-s. 来自'],
  ['adj. 奇怪的'],
];
const question_index = [26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

interface Props {}

const VocabularyComprehension: React.FC<Props> = (props) => {
  const [mousePoint, setMousePoint] = useState<Point>(null as Point);
  const [selectedWord, setSelectedWord] = useState();
  //当前被点击的英文句子文本，以及翻译
  const [curTranslation, setCurTranslation] = useState();
  const [curEnglishText, setCurEnglishText] = useState();

  //判卷结果
  const [jugementResult, setJudgementResult] = useState<any>();

  //当前需要ToolTip的句子
  const [activeTooltip, setActiveTooltip] = useState(
    '在许多植物中，无法消化的种子皮使种子不受伤害地通过鸟类的消化系统。',
  );

  //active 备选单词
  const [activeWord, setActiveWord] = useState();

  const {
    judgementResultModal,
    closeModal: closeJudgementResultModal,
    openModal: openJudgementResultModal,
  } = useJudgementResultModal();

  const callback = (event, chinese, english, questionIndex) => {
    event.stopPropagation();
    setCurTranslation(chinese);
    setCurEnglishText(english);

    const { anchorNode, anchorOffset, focusNode, type } = window.getSelection();

    if (type != 'Range') {
      setSelectedWord(null);
      if (questionIndex) {
        setActiveTooltip(questionIndex + chinese);
      } else {
        setActiveTooltip(chinese);
      }
      return;
    }
    setActiveTooltip(null);
    setSelectedWord(getSelectionWord(anchorNode.textContent, anchorOffset));
    setMousePoint({ x: event.clientX, y: event.clientY });
  };

  //滚动左侧时触发
  const clickOuter = () => {
    setSelectedWord(null); //清空选中单词，关闭单词卡片
    setActiveTooltip(null);
    window.getSelection().removeAllRanges(); //清空鼠标选中内容
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
    return document.getElementById('vocabulary_comprehension_content')?.offsetWidth;
  }, [activeTooltip]);

  return (
    <ReadingWrapper clickOuter={clickOuter} okHandler={okHandler} topBarTitle='2022年卷二仔细阅读21'>
      <div className={styles.left}>
        {question_index.map((item, index) => {
          return (
            <QuestionCard
              questionWords={question_words}
              questionIndex={question_index[index]}
              questionWordsChinese={question_words_chinese}
              setActiveWord={setActiveTooltip}
              activeWord={activeTooltip}
              clickCallback={callback}></QuestionCard>
          );
        })}
      </div>
      <div className={styles.content} id='vocabulary_comprehension_content'>
        {vocabulary_passage?.chinese.map((item, index) => {
          return (
            <TranslationToolip
              title={vocabulary_passage?.chinese[index]}
              toolTipWidth={toolTipWidth}
              isOpen={vocabulary_passage?.chinese[index] === activeTooltip}
              clickCallback={callback}>
              {vocabulary_passage?.english[index]}
            </TranslationToolip>
          );
        })}
      </div>
    </ReadingWrapper>
  );
};

export default VocabularyComprehension;
