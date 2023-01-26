const versionParse = (version) => {
  if (version === 1 || version === '1') {
    return '卷一';
  } else if (version === 2 || version === '2') {
    return '卷二';
  } else if (version === 3 || version === '3') {
    return '卷三';
  }
};

export const formateCardTitle = (year, month, version, type?) => {
  return `${month}月${versionParse(version)}`;
};

//判断某个字符是否是英文标点符号
export const isPunctuationtext = (char) => {
  let set = ['.', ',', ':', ';', '?', '!', '"', "'", '(', ')', '[', ']', '{', '}', '“', '”', '’'];
  return set.includes(char);
};

//text是文本，pivot是鼠标点击的起点，返回值是当前鼠标选中的单词
export const getSelectionWord = (text, pivot) => {
  while (text[pivot] === ' ' || isPunctuationtext(text[pivot])) {
    pivot++;
  }
  if (pivot >= text.length) {
    return;
  }
  let start = pivot;
  let end = pivot;
  while (start > 0 && text[start - 1] != ' ' && !isPunctuationtext(text[start - 1])) {
    start--;
  }
  while (end < text.length - 1 && text[end + 1] != ' ' && !isPunctuationtext(text[end + 1])) {
    end++;
  }
  console.log('范围是', start, end, text.substring(start, end + 1).toLowerCase());
  return text.substring(start, end + 1).toLowerCase();
};

//把数字转化为ABCD
export const indexToOption = (index) => {
  const map = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
  return map[index];
};

//交卷后，判断该题是否正确。wrongOptions是判卷解雇，index是该题的下标（从0开始）
export const isCorrect = (wrongOptions, index) => {
  return wrongOptions?.your_answer === index && wrongOptions?.correct_answer === wrongOptions?.your_answer;
};
export const isWrong = (wrongOptions, index) => {
  return wrongOptions?.your_answer === index && wrongOptions?.correct_answer !== wrongOptions?.your_answer;
};

//判断该选项是否处于选中状态
export const isSelected = (index, selected, wrongOptions) => {
  //如果已经交卷，则不会展示选中状态
  if (wrongOptions) {
    return false;
  }
  return index === selected;
};
