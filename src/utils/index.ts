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
