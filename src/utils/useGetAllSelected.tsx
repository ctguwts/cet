import React, { memo, Suspense, useEffect, useMemo, useState } from 'react';

/*
该函数在questionCard中使用，每次改变选项，都会更新allSelected。allSelected在父组件声明，表示用户的作答
allSelected: 本篇阅读所有题目的作答，格式如下：
[
    {
        "questionIndex": 55,
        "option": 0
    },
    {
        "questionIndex": 54,
        "option": 1
    },
    {
        "questionIndex": 53,
        "option": 2
    },
    {
        "questionIndex": 52,
        "option": 3
    },
    {
        "questionIndex": 51,
        "option": 0
    }
]
questionIndex：阅读的题号
selected：该题的选项
**/
interface Props {
  allSelected?: any;
  setAllSelected?: any;
  questionIndex?: any;
  selected?: any;
}
export const useGetAllSelected = (props: Props) => {
  const { allSelected, setAllSelected, questionIndex, selected } = props;
  useEffect(() => {
    let beforeIndex = null;
    //该题之前是否答过
    for (let index = 0; index < allSelected.length; index++) {
      if (allSelected[index].questionIndex === questionIndex) {
        beforeIndex = index;
      }
    }
    //如果之前回答过，先删除之前的答案(tmpList是深拷贝)
    let tmpList = JSON.parse(JSON.stringify(allSelected));
    if (beforeIndex !== null) {
      tmpList.splice(beforeIndex, 1);
    }
    //把当前答案存入数组
    tmpList.push({
      questionIndex: questionIndex,
      option: selected,
    });
    // console.log('更新列表', tmpList);
    setAllSelected(tmpList);
  }, [selected]);
};

/* 已废弃
该函数仅在 选词填空 中使用，allSelected表示用户的作答，optionIndex表示选项的index，
返回ture表示该选项在其他作答中被选择过，因此变灰
*/
export const isSelectedInOtherQuestion = (allSelected, optionIndex) => {
  for (let i = 0; i < allSelected.length; i++) {
    if (allSelected[i]?.option === optionIndex) {
      return true;
    }
  }
  return false;
};

/* 
该函数仅在 选词填空 中使用，allSelected表示用户的作答，optionIndex表示选项的index，
返回值表示该选项第几题被选过
*/
export const findGrayIndex = (allSelected, optionIndex) => {
  for (let i = 0; i < allSelected.length; i++) {
    if (allSelected[i]?.option === optionIndex) {
      return allSelected[i]?.questionIndex;
    }
  }
  return 0;
};
