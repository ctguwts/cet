import React, { CSSProperties, memo, Suspense, useState, useMemo, useEffect } from 'react';
import cls from 'classnames';
import { Tooltip, Divider, Modal } from 'antd';

import WordTranslationBox from '@/components/word-translation-box';

import { Point } from '@/const/types';
import { jugement_result_long_reading } from '@/mock-data/data';
import QuestionCard from './question-card';
import { getSelectionWord } from '@/utils';

import { useJudgementResultModal } from '@/components/judgement-result-modal';
import ReadingWrapper from '@/components/reading-wrapper';

import styles from './styles.module.scss';
import TranslationToolip from '@/components/translation-tooltip';
import PassageAnalysis from '@/components/passage-analysis';

//英文以.或者.”切割 中文以。或者。”切割

const long_reading_passage = {
  chinese: [
    'A) 在英国的冬天，幻想着可以在海景别墅中度过两个星期的时间，欣赏令人心怡的海景，在巨大的泳池享受，这足以抵消掉假期到来之前的劳动',
    '然而，对于越来越多的人而言，这每年一度的假期逐渐变成一场噩梦，因为他们最终发现花费了几千元的房子其实并不存在，而他们预定假期的网站也早已消失不见',
    '<br></br>',
    'B) 消费者们已经被警告要留意市场上潜在的诈骗风险，这种现象已经远不是个例',
    '根据负责报道该类诈骗行为的国家级防诈骗行动处的数据，在2017年就曾有1,632个“度假别墅”案例被报道，受害者们人均损失了约2,052英镑',
    '英国旅行社协会的肖恩·希普敦说：“这些被诈骗的度假者们每年都会损失成千上百万英镑',
    '<br></br>',
    'C) 在过去的十年间，这类问题与日俱增，骗术也变得越来越复杂',
    '虚假的网站拥有听起来非常逼真的名称，包含很多关键词，较为典型的如地点名称，“夏天”“别墅”或“出租”',
    '合法的别墅的细节经常从别的网站上盗用',
    '“诈骗者刚开始的时候手段并不复杂—网站看起来尽显业余，也并未付出很多努力去打造',
    '希普敦说，“现在他们变得精明了',
    '他们从合法的网站上大量剽窃，然后使用一个不同的网站名称',
    '他们会发布销售团队的照片，而团队负责人很有可能是纽约的一位过气演员',
    '<br></br>',
    'D) 诈骗者把英国游客去西班牙旅游的热门海滨胜地作为目标，如果供不应求，价格就会飙升',
    '价格会被控制在合理的范围内，以免引起怀疑',
    '希普敦说：“在别处的度假别墅也许需要5,000英镑，而他们则以3,500英镑的价格出售',
    '但有一个漏洞是，他们的别墅比其他网站都要便宜，而且无限量供应',
    '诈骗者同时会投放搜索引擎的点击付费广告，当人们输入诸如“西班牙海景别墅”这样的关键词后，他们的信息会出现在顶端',
    '<br></br>',
    'E) 诈骗者有如此的专业程度，消费者们如何才能发现他们预定的网站是否可信呢?“当人们在预定度假别墅的时候，往往带着乐观的态度，”安全上网的首席执行官托尼·尼特说。',
    '他们应该搜索一下这些别墅的产权信息，并通过谷歌地图这类的网站去查看一下是否真实存在',
    '同时，通过固定电话的方式联系一下协助你预定的人员，因为诈骗者通常都用手机联络',
    '他也建议让不去度假的人看一下网站',
    '“他们也许能够发现你忽视的问题',
    '另一个潜在的危险信号是被要求进行银行汇款',
    '“问题在于当钱款离开你的账户，就会立刻进入到他们的账户，并且很难追踪',
    '巴莱克银行数据安全部门的负责人乔迪·吉尔伯特说：“我们通常推荐其他形式的支付方式，如信用卡',
    '<br></br>',
    'F) 人们对这些骗子知之甚少',
    '“没有什么方法可以明确知晓他们是谁',
    '尼特说，“有可能是任何人',
    '也许是你的隔壁邻居或者是俄罗斯的犯罪团伙',
    '防诈骗行动处表示人们应该确保租用别墅的公司是类似英国旅行社协会这样的被大家公认的贸易体的成员之一',
    '<br></br>',
    'G) “通过与行业伙伴，如英国旅行社协会和安全上网（机构）合作，我们能够针对亟待关注的近期风险发布一些警告',
    '如果你确信你已经成为诈骗或是网络犯罪的受害者，请向防诈骗行动处报告，”它补充道',
    '英国旅行协会表示他们将通过组织公众意识宣传活动来解决这一问题',
    '“这是一个日益严重的问题，人们无法阻止骗子行骗，”希普敦说，“他们仍然会这么做',
    '制止这种行为并不是毫无可能，但是鉴于这是基于互联网的行为，更难去追踪',
    '<br></br>',
    'H) 别墅预定公司“别墅+”的创始人和共同所有人尼克·库伯估计，他们公司在过去的两年间已经揭露超过200家虚假的别墅预订网站，并且认为他们做的还不够多',
    '“向提供虚假别墅预订网站的互联网巨头举报是没有希望的',
    '他说，“我发现很难向任何人说起此事',
    '另外，一旦一个银行账户被举报，他们就会使用另外一个',
    '<br></br>',
    'I) 现如今，唯一一个能够阻止诈骗者的方式似乎最终掌握在消费者手中',
    '“当人们预定假期的时候，他们会非常投入，当他们发现在旅游旺季能够以较好的价格预定到别墅，他们很容易成为目标，”库伯说',
    '“公众必须学会提高警惕，他们是这类诈骗的目标对象',
    '但是这并不仅仅是财物损失',
    '“一家人会出现在别墅区，最终发现它并不存在或是主人并不知道你是谁，”希普敦说',
    '“问题在于你需要在得知这一切后，迅速找到住处',
    '这可能会非常昂贵，但这也是一种情感的损耗',
    '<br></br>',
    'J) 来自于锡德纳姆的卡拉·奥肖内西去年通过大量搜索来预定马略卡岛的别墅，作为家庭的夏日度假胜地',
    '奥肖内西说：“我比对了网上的报价，最终找到了一家相对便宜的',
    '她通过网站给这家公司发送了邮件，询问了别墅与机场的距离以及当地餐馆的事宜',
    '她说：“他们给出了可信的答案，都非常友善和专业',
    '她对于这种回复感到非常满意，奥肖内西通过银行汇款的方式向旅行社的账户支付了全额3,000英镑，并且直到预定日期前一个月才想起来此事',
    '<br></br>',
    'K) “我尝试登录网站但登录不了，”她回忆说',
    '“我在谷歌上搜索了代理人的名字，发现有很多人抱怨他是个骗子',
    '要是我提前搜索一下相关信息就好了，但是我并没有想到这一点',
    '尽管她及时找到了另一家度假别墅，但她承认自己变得更加谨慎了',
    '“我通过一个安全的第三方网站进行支付，并且和代理机构进行了电话沟通',
    '但是直到拿到钥匙的那一刻，我才放松下来',
    '<br></br>',
  ],
  english: [
    'A) During the British winter, the thought of two weeks in a coastal <i>villa </i>(别墅) with soul-stirring views of the sea and a huge pool to enjoy is enough to <i>offset</i> (抵消) the labor until the holidays start.',
    'For a growing number of people, however, their yearly break is turning into a nightmare as they find that the property they have paid thousands for does not exist and the website through which they booked it has disappeared.',
    '<br></br>',
    'B) Consumers have been warned to be aware of the potential for deception in this market, which is far from uncommon.',
    'In 2017 there were 1,632 cases of reported “<i>villa fraud </i>(诈骗)”, with victims losing an average of £2, 052, according to Action Fraud, the national center for reporting such frauds.',
    '“Millions of pounds are lost each year by defrauded holidaymakers,” says Sean Tipton of the Association of British Travel Agents ( ABTA) .',
    '<br></br>',
    'C) The problem has ballooned in the last 10 years, with frauds becoming more and more sophisticated.',
    'The fake websites have authentic-sounding names involving a mix of keywords, typically including the place name, “summer”, “villas” or “rentals” .',
    'Details of <i>legitimate</i> (合法的) villas are often stolen from other sites.',
    '“When the fraudsters first started it was unsophisticated—the websites looked amateur and there wasn’t a lot of effort,” says Tipton.',
    '“Now they are clever.',
    'They extensively rip off legitimate websites and use a different website name.',
    'They’ll have pictures of a sales team and it might be a poor actor in New York that is down as their head of sales.”',
    '<br></br>',
    'D) Fraudsters target popular seaside destinations for British tourists visiting Spain where prices can soar if demand exceeds supply.',
    'Prices are kept within reasonable ranges to avoid arousing suspicion.',
    '“A villa might cost £5,000 elsewhere and they will offer it at say £3,500.',
    'But a bit of a giveaway is that the villa will be cheaper than on other websites and there’s unlimited availability,” says Tipton.',
    'Fraudsters also invest in pay-per-click advertising to feature at the top of search engines when people type in phrases such as “Spanish seaside villas”.',
    '<br></br>',
    'E) With such a degree of professionalism, how can consumers find out if the website they’re looking to book with is trustworthy? “When people book holiday villas they are doing so through rose-colored glasses,” says Tony Neate, chief executive of Get Safe Online.',
    '“They should be Googling the property, and looking on websites like Google Maps and StreetView to see if it’s there.',
    'Also, speak to the person you’re booking the villa with on a landline phone, as fraudsters tend to only use mobiles.”',
    'He also suggests asking someone not going on the holiday to have a look at the website.',
    '“They might spot problems you don’t spot.”',
    'Another potential red flag is being asked to pay by bank transfer.',
    '“The problem is that when the money leaves your account it’s in theirs straightaway and it’s very hard to track it,” says Barclays Bank head of digital safety, Jodie Gilbert.',
    '“We generally recommend other forms of payment, like credit card.”',
    '<br></br>',
    'F) Little seems to be known about these fraudsters.',
    '“There is no way to definitely know who they are,” says Neate.',
    '“It could be anyone.',
    'It could be your next-door neighbor or organized crime in Russia.”',
    'Action Fraud says people should ensure the company renting the villa is a member of a recognized trade body such as ABTA.',
    '<br></br>',
    'G) “By working with industry partners such as ABTA and Get Safe Online, we are able to issue alerts about the latest threats they should be aware of.',
    'If you believe you have fallen victim to fraud or cyber-crime, please report it to Action Fraud,” it adds.',
    'ABTA says it is trying to combat the issue by running public awareness campaigns.',
    '“It’s a growing problem and people can’t stop fraudsters being dishonest,” says Tipton.“They’re still going to do it.',
    'It’s not impossible to stop but as it’s internet-based it’s harder to pursue.”',
    '<br></br>',
    'H) Nick Cooper, the founder and co-owner of villa booking company Villa Plus, estimates his company has uncovered more than 200 fake villa websites over the past two years, and doesn’t believe enough is being done.',
    '“It is hopeless to report fake villa websites to the internet giants who host them,” he says.',
    '“I found it impossible to speak to anyone.',
    'Also, once one bank account gets reported, they simply use another.”',
    '<br></br>',
    'I) For now the only way to stop fraudsters appears ultimately to lie in the hands of the consumer.',
    '“When people book their holidays they get so emotionally involved, and when they find that villa at a good price with availability in peak season, they are an easy target,” says Cooper.',
    '“The public has to learn to be far more aware they are a target for these sort of frauds.”',
    'But it’s not just the financial cost.',
    '“A family will turn up at a villa and find out it doesn’t exist or the owner doesn’t know who you are,” says Tipton.',
    '“The problem then is you have to find accommodation at short notice.',
    'It can be incredibly expensive but it’s the emotional cost, too.”',
    '<br></br>',
    'J) Carla O’Shaughnessy from Sydenham was searching last year for a good deal to book a villa in Majorca for a summer break for the family.',
    '“I was comparing prices online and found one that came in a bit cheaper than others,” says O’Shaughnessy.',
    'She emailed the company via its website, asking how far the villa was from the airport and about local restaurants.',
    '“They came back with believable answers; it was all very friendly and professional,” she says.',
    'Happy with the responses, O’Shaughnessy paid the full amount of £3,000 via bank transfer into the travel agent’s account and then forgot about it until a month before the booking.',
    '<br></br>',
    'K) “I tried logging on to the website and couldn’t,” she recalls.',
    '“I Googled the agent’s name and there were lots of complaints about him being a fraudster.',
    'If only I’d Googled before but I never thought of it.”',
    'Although she found another villa in time for their holiday, she admits she was much more cautious.',
    '“I paid through a secure third-party site and had phone conversations with the agent.',
    'But I wasn’t able to relax until we turned up and I had the keys.”',
    '<br></br>',
  ],
};

const questionIndex = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

const questionSentences = [
  'Fraudsters often steal villa-booking information from authentic holiday websites.',
  'Fraudsters keep changing their bank accounts to avoid being tracked.',
  'It is suggested that people not going on the holiday might help detect website frauds.',
  'More and more British holidaymakers find the seaside villas they booked online actually nonexistent.',
  'By checking an agent’s name online before booking a villa, holidaymakers can avoid falling into traps.',
  'Fraudsters are difficult to identify, according to an online safety expert.',
  'Holidaymakers have been alerted to the frequent occurrence of online villa-booking frauds.',
  'It is holidaymakers that can protect themselves from falling victim to frauds.',
  'Holidaymakers are advised not to make payments by bank transfer.',
  'Fraudsters advertise their villas at reasonable prices so as not to be suspected.',
];

const questionSentencesChinese = [
  '诈骗者通常会从真实的度假网站上窃取一些别墅预定的信息。',
  '为了避免被追踪，诈骗者会不断更换银行账户。',
  '有人建议不去度假的人可能有助于察觉网站骗局。',
  '越来越多的英国度假者发现他们在网站上预定的海滨别墅其实并不存在。',
  '度假者在预定别墅之前，在网上核实一下代理人的名字可以避免掉入陷阱。',
  '根据一位网络安全专家所言，诈骗者很难被识别。',
  '度假者们已经对那些频繁发生的网络别墅预定诈骗行为有所警觉。',
  '只有度假者本人能够保护自己避免沦为网络诈骗的受害者。',
  '度假者被建议不要通过银行转账的方式进行支付。',
  '诈骗者为了避免被怀疑，会以一个合理的价格对他们的度假别墅进行宣传。',
];

const options = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
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

const LongReading: React.FC<Props> = (props) => {
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
    setJudgementResult(jugement_result_long_reading);
    openJudgementResultModal();
  };

  const toolTipWidth = useMemo(() => {
    return document.getElementById('vocabulary_comprehension_content')?.offsetWidth;
  }, [activeTooltip]);

  return (
    <ReadingWrapper clickOuter={clickOuter} okHandler={okHandler} topBarTitle='2022年卷二段落匹配'>
      <div className={styles.left}>
        {questionIndex.map((item, index) => {
          return (
            <QuestionCard
              questionSentences={questionSentences[index]}
              questionIndex={questionIndex[index]}
              questionSentencesChinese={questionSentencesChinese[index]}
              options={options}
              setActiveTooltip={setActiveTooltip}
              activeTooltip={activeTooltip}
              clickCallback={callback}
              allSelected={allSelected}
              wrongOptions={jugementResult?.options[index]}
              setAllSelected={(tmpList) => {
                setAllSelected(tmpList);
              }}></QuestionCard>
          );
        })}
      </div>
      <div className={styles.content} id='vocabulary_comprehension_content'>
        {long_reading_passage?.chinese.map((item, index) => {
          return (
            <TranslationToolip
              title={long_reading_passage?.chinese[index]}
              toolTipWidth={toolTipWidth}
              isOpen={long_reading_passage?.chinese[index] === activeTooltip}
              clickCallback={callback}>
              {long_reading_passage?.english[index]}
            </TranslationToolip>
          );
        })}
        {jugementResult ? <PassageAnalysis translation={translation} jugementResult={jugementResult} /> : null}
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

export default LongReading;
