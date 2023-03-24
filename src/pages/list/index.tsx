import React, { memo, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

import Menu from '@/components/menu';
import PersonalArchive from './components/personal-archive';
import { list_data } from '@/mock-data/data';
import InfoCard from './components/info-card';
import Ranking from './components/ranking';

import { VOCABULARYCOMPREHENSION, LONGREADING, CAREFULREADING, nameMapping } from '@/const/index';

import styles from './styles.module.scss';

interface Props {
  title: string;
  description: string;
  junmLink: string;
}

//这个模拟api发送请求，返回对应的列表。此处用mock数据代替请求
const requestMap = (jumpParam) => {
  if (jumpParam === VOCABULARYCOMPREHENSION) {
    return list_data.vocabulary_comprehension_reading_list;
  } else if (jumpParam === LONGREADING) {
    return list_data.long_reading_list;
  } else if (jumpParam === CAREFULREADING) {
    return list_data.careful_reading;
  }
};

const List: React.FC<Props> = (props) => {
  const { title, description, junmLink } = props;
  const [currentTab, setCurrentTab] = useState(VOCABULARYCOMPREHENSION);
  const [requestRes, setRequestRes] = useState([]);
  const location = useLocation();
  const jumpParam = location?.state?.jumpParam;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentTab(jumpParam);
  }, []);

  //每次tab切换，重新发送一次请求
  useEffect(() => {
    setRequestRes(requestMap(currentTab));
  }, [currentTab]);

  const onTabChange = (value) => {
    setCurrentTab(value);
  };
  return (
    <div>
      <Menu />
      <div className={styles.list}>
        <Breadcrumb className={styles.bread}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>当前位置</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.content}>
          <div className={styles.left}>
            <Tabs
              activeKey={currentTab}
              onChange={onTabChange}
              size='large'
              items={[
                {
                  label: `选词填空`,
                  key: VOCABULARYCOMPREHENSION,
                },
                {
                  label: `长篇阅读`,
                  key: LONGREADING,
                },
                {
                  label: `仔细阅读`,
                  key: CAREFULREADING,
                },
              ]}
            />
            <div className={styles.yearSelectButtons}>
              <Button>2022~2019</Button>
              <Button>2018~2014</Button>
            </div>
            {requestRes.map((group) => {
              //一个group是一年的卡片（6张，3个6月，3个12月）
              return (
                <div className={styles.oneYear}>
                  <div className={styles.yearTitle}>{`${group.groupTitle}`}</div>
                  <div className={styles.groupCards}>
                    {group?.list?.map((item) => {
                      return (
                        <div className={styles.infoCard}>
                          <InfoCard {...item} />
                          <button
                            onClick={() => {
                              navigate('/long-conversation');
                            }}>
                            long-conversation
                          </button>
                          <button
                            onClick={() => {
                              navigate('/long-reading');
                            }}>
                            long-reading
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.right}>
            <div className={styles.personCard}>
              <PersonalArchive />
            </div>
            <div className={styles.ranking}>
              <Ranking />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
