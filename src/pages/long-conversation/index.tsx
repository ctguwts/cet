import React, { CSSProperties, memo, Suspense, useState, useMemo, useEffect } from 'react';
import cls from 'classnames';
import { Tooltip, Divider, Modal } from 'antd';

import WordTranslationBox from '@/components/word-translation-box';

import { Point } from '@/const/types';
import QuestionCard from './question-card';
import { getSelectionWord } from '@/utils';
import ReadingWrapper from '@/components/reading-wrapper';

import { before_submit, after_submit as jugement_result_long_conversation } from '@/mock-data/data-long-conversation';
import { useJudgementResultModal } from '@/components/judgement-result-modal';

import styles from './styles.module.scss';
import TranslationToolip from '@/components/translation-tooltip';

import AudioPlayer from '@/components/audio-player';

const { currentLyrics, englishArr, chineseArr, englishClueArr, chineseClueArr, optionEnglish, optionsChinese, questionIndex } = before_submit;

const tyzd = [
  '音频对应处前面男士询问女士是否可以给一些建议，问答之间易出考点，考生需留意接下来的回答。',
  '音频对应处出现了main problem is..这样的表达，通常在音频中如果出现main、most或者比较级的表达的话，极易出现考点，考生需留意。',
  null,
  '音频对应处出现了表示建议的表达I suggest，之后常常会出现考点，考生需留意。',
];

const interference = [
  'B选项音频未提及，故排除；C选项中的notes为干扰信息，音频并未提及要定期复习笔记，故排除；D选项中的stress-relief为干扰信息，音频并未提及减压相关的课程，故排除。',
  'A选项中的terribly messy在音频中未提及，故排除；B选项音频虽有提及，但并非题目所问的男士在学习中最大的问题，故排除；D选项中的notes为干扰信息，音频并未提及这位男士难以快速记笔记，故排除。',
  'A、D选项音频虽均有提及，但并非题目所问的女士所属的学习者类型，故排除；C选项为音频中badly organized和learner的杂糅，音频未提及这类学习者，故排除。',
  'B选项虽可对应音频中logical learner的学习方式，但与题目所问不符，故排除；C选项音频未提及，故排除；D选项音频虽有提及，但这是这位女士自己作为情感学习者的记笔记方式，与题目所问不符，故排除。',
];

const translation = [
  '<b>关于虚假度假别墅网站的安全警示</b>',
  '<br />',
  'A) （39）<u>在英国的冬天，幻想着可以在海景别墅中度过两个星期的时间，欣赏令人心怡的海景，在巨大的泳池享受，这足以抵消掉假期到来之前的劳动。然而，对于越来越多的人而言，这每年一度的假期逐渐变成一场噩梦，因为他们最终发现花费了几千元的房子其实并不存在，而他们预定假期的网站也早已消失不见。</u>',
  '<br />',
  'B) （42）<u>消费者们已经被警告要留意市场上潜在的诈骗风险，这种现象已经远不是个例。</u>根据负责报道该类诈骗行为的国家级防诈骗行动处的数据，在2017年就曾有1,632个“度假别墅”案例被报道，受害者们人均损失了约2,052英镑。英国旅行社协会的肖恩·希普敦说：“这些被诈骗的度假者们每年都会损失成千上百万英镑。”',
  '<br />',
  'C) 在过去的十年间，这类问题与日俱增，骗术也变得越来越复杂。（36-1）<u>虚假的网站拥有听起来非常逼真的名称，包含很多关键词，较为典型的如地点名称，“夏天”“别墅”或“出租”。合法的别墅的细节经常从别的网站上盗用。</u>“诈骗者刚开始的时候手段并不复杂—网站看起来尽显业余，也并未付出很多努力去打造。”希普敦说，“现在他们变得精明了。（36-2）<u>他们从合法的网站上大量剽窃，然后使用一个不同的网站名称。</u>他们会发布销售团队的照片，而团队负责人很有可能是纽约的一位过气演员。”',
  '<br />',
  'D) 诈骗者把英国游客去西班牙旅游的热门海滨胜地作为目标，如果供不应求，价格就会飙升。（45）<u>价格会被控制在合理的范围内，以免引起怀疑。</u>希普敦说：“在别处的度假别墅也许需要5,000英镑，而他们则以3,500英镑的价格出售。但有一个漏洞是，他们的别墅比其他网站都要便宜，而且无限量供应。”诈骗者同时会投放搜索引擎的点击付费广告，当人们输入诸如“西班牙海景别墅”这样的关键词后，他们的信息会出现在顶端。',
  '<br />',
  'E) 诈骗者有如此的专业程度，消费者们如何才能发现他们预定的网站是否可信呢?“当人们在预定度假别墅的时候，往往带着乐观的态度，”安全上网的首席执行官托尼·尼特说，“他们应该搜索一下这些别墅的产权信息，并通过谷歌地图这类的网站去查看一下是否真实存在。同时，通过固定电话的方式联系一下协助你预定的人员，因为诈骗者通常都用手机联络。”（38）<u>他也建议让不去度假的人看一下网站。“他们也许能够发现你忽视的问题。”</u>（44）<u>另一个潜在的危险信号是被要求进行银行汇款。“问题在于当钱款离开你的账户，就会立刻进入到他们的账户，并且很难追踪。”巴莱克银行数据安全部门的负责人乔迪·吉尔伯特说：“我们通常推荐其他形式的支付方式，如信用卡。”</u>',
  '<br />',
  'F) 人们对这些骗子知之甚少。（41）<u>“没有什么方法可以明确知晓他们是谁。”</u>尼特说，“有可能是任何人。也许是你的隔壁邻居或者是俄罗斯的犯罪团伙。”防诈骗行动处表示人们应该确保租用别墅的公司是类似英国旅行社协会这样的被大家公认的贸易体的成员之一。',
  '<br />',
  'G) “通过与行业伙伴，如英国旅行社协会和安全上网（机构）合作，我们能够针对亟待关注的近期风险发布一些警告。如果你确信你已经成为诈骗或是网络犯罪的受害者，请向防诈骗行动处报告，”它补充道。英国旅行协会表示他们将通过组织公众意识宣传活动来解决这一问题。“这是一个日益严重的问题，人们无法阻止骗子行骗，”希普敦说，“他们仍然会这么做。制止这种行为并不是毫无可能，但是鉴于这是基于互联网的行为，更难去追踪。”',
  '<br />',
  'H) 别墅预定公司“别墅+”的创始人和共同所有人尼克·库伯估计，他们公司在过去的两年间已经揭露超过200家虚假的别墅预订网站，并且认为他们做的还不够多。（37）<u>“向提供虚假别墅预订网站的互联网巨头举报是没有希望的。”他说，“我发现很难向任何人说起此事。另外，一旦一个银行账户被举报，他们就会使用另外一个。”</u>',
  '<br />',
  'I) （43）<u>现如今，唯一一个能够阻止诈骗者的方式似乎最终掌握在消费者手中。</u>“当人们预定假期的时候，他们会非常投入，当他们发现在旅游旺季能够以较好的价格预定到别墅，他们很容易成为目标，”库伯说。“公众必须学会提高警惕，他们是这类诈骗的目标对象。”但是这并不仅仅是财物损失。“一家人会出现在别墅区，最终发现它并不存在或是主人并不知道你是谁，”希普敦说。“问题在于你需要在得知这一切后，迅速找到住处。这可能会非常昂贵，但这也是一种情感的损耗。”',
  '<br />',
  'J) 来自于锡德纳姆的卡拉·奥肖内西去年通过大量搜索来预定马略卡岛的别墅，作为家庭的夏日度假胜地。奥肖内西说：“我比对了网上的报价，最终找到了一家相对便宜的。”她通过网站给这家公司发送了邮件，询问了别墅与机场的距离以及当地餐馆的事宜。她说：“他们给出了可信的答案，都非常友善和专业。”她对于这种回复感到非常满意，奥肖内西通过银行汇款的方式向旅行社的账户支付了全额3,000英镑，并且直到预定日期前一个月才想起来此事。',
  '<br />',
  'K) “我尝试登录网站但登录不了，”她回忆说。（40）<u>“我在谷歌上搜索了代理人的名字，发现有很多人抱怨他是个骗子。要是我提前搜索一下相关信息就好了，但是我并没有想到这一点。”</u>尽管她及时找到了另一家度假别墅，但她承认自己变得更加谨慎了。“我通过一个安全的第三方网站进行支付，并且和代理机构进行了电话沟通。但是直到拿到钥匙的那一刻，我才放松下来。”',
  '<br />',
];

interface Props {}

const LongConversation: React.FC<Props> = (props) => {
  console.log('currentLyrics,englishArr,chineseArr', currentLyrics.length, englishArr.length, chineseArr.length);
  const [mousePoint, setMousePoint] = useState<Point>(null as Point);
  const [selectedWord, setSelectedWord] = useState();
  //当前被点击的英文句子文本，以及翻译
  const [curTranslation, setCurTranslation] = useState();
  const [curEnglishText, setCurEnglishText] = useState();
  const [allSelected, setAllSelected] = useState([]); //用户作答

  //判卷结果
  const [jugementResult, setJudgementResult] = useState<any>();

  //当前需要ToolTip的句子
  const [activeTooltip, setActiveTooltip] = useState('在许多植物中，无法消化的种子皮使种子不受伤害地通过鸟类的消化系统。');

  const { judgementResultModal, closeModal: closeJudgementResultModal, openModal: openJudgementResultModal } = useJudgementResultModal();

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

  //滚动时触发
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
    console.log('提交的作答是', allSelected);
    setJudgementResult(jugement_result_long_conversation);
    openJudgementResultModal();
  };

  const toolTipWidth = useMemo(() => {
    return document.getElementById('vocabulary_comprehension_content')?.offsetWidth;
  }, [activeTooltip]);

  return (
    <ReadingWrapper clickOuter={clickOuter} okHandler={okHandler} topBarTitle=' 2012年6月卷一长对话2' rightNoPadding={true}>
      <div className={styles.left}>
        {questionIndex.map((item, index) => {
          return (
            <QuestionCard
              questionIndex={questionIndex[index]}
              // questionEnglish={reading_question_english[index]}
              // questionChinese={reading_question_chinese[index]}
              optionsEnglish={optionEnglish[index]}
              optionsChinese={optionsChinese[index]}
              setActiveSentence={(sentence) => {
                setActiveTooltip(sentence);
              }} //设置问题的activeTooltip
              activeSentence={activeTooltip}
              clickCallback={callback}
              wrongOptions={jugementResult?.options[index]}
              setAllSelected={setAllSelected} //设置用户作答（本篇阅读，共五题）
              allSelected={allSelected} //用户作答
            />
          );
        })}
      </div>
      <div className={styles.content} id='vocabulary_comprehension_content'>
        <AudioPlayer
          currentLyrics={currentLyrics}
          englishArr={englishArr}
          chineseArr={chineseArr}
          englishClueArr={englishClueArr}
          chineseClueArr={chineseClueArr}
        />
        {/* {jugementResult ? (
          <>
            <div className={styles.translationText}>
              <div className={styles.translationTitle}>参考译文</div>
              {translation.map((item) => {
                return <div dangerouslySetInnerHTML={{ __html: item }}></div>;
              })}
            </div>
            <div className={styles.translationText}>
              <div className={styles.translationTitle}>材料分析</div>
              <div>{jugementResult?.passage_abstract}</div>
            </div>
          </>
        ) : null} */}
        {selectedWord ? (
          <WordTranslationBox
            mousePoint={mousePoint}
            word={selectedWord}
            closeWordTranslationBox={closeWordTranslationBox}
            curTranslation={curTranslation}
            curEnglishText={curEnglishText}
          />
        ) : null}
      </div>
    </ReadingWrapper>
  );
};

export default LongConversation;
