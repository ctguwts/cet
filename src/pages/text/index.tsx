import React, { memo, Suspense, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
export const Text = () => {
  return (
    <div>
      <div className={styles.parent}>
        <div className={styles.left}>
          <div dangerouslySetInnerHTML={{ __html: '<p>This is some text.</p>' }} />
          <div>
            第一步，找定位词：distance
            learning、norm第二步，段落定位。题目问及“远程学习可能成为常态的主要原因是什么”，根据定位词，定位至首段：In the coming
            era of budget cuts to education, <u>distance learning</u> could become the <u>norm</u>
            .第三步，对比选项和文章。B选项的Shrinking financial resources是定位段budget cuts的同义替换，故本题答案为B。
          </div>
        </div>
        <div className={styles.right}>
          很多事卡机亨德拉可视对讲卡萨丁卡萨丁has考虑到哈卡死了的挥洒肯定会大数据库的哈斯客户端哈萨克德哈卡的挥洒考虑到手机卡
        </div>
      </div>
    </div>
  );
};

export default Text;
