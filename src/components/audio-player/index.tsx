import React, { memo, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import { Slider, Radio } from 'antd';
import { PlayCircleFilled, PlayCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import audioSrc from './2.mp3';
import { formatMinuteSecond } from '@/utils/format-utils';
import styles from './styles.module.scss';

interface Props {
  currentLyrics: any;
  englishArr: any; //英文句子数组
  chineseArr: any; //中文句子数组
  englishClueArr: any; //英文段落数组
  chineseClueArr: any; //中文段落数组
}

type TabMode = 'sentence' | 'paragraph';
const AudioPlayer: React.FC<Props> = (props: Props) => {
  const { currentLyrics, englishArr, chineseArr, englishClueArr, chineseClueArr } = props;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [audioSrc,setAudioSrc] = useState()
  const [isChanging, setIsChanging] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(221);
  const [finalIndex, setFinalIndex] = useState<number>();
  const audioRef = useRef<HTMLAudioElement>();

  const [mode, setMode] = useState<TabMode>('sentence');

  //切换文字模式
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  //切换播放状态
  const play = useCallback(() => {
    setIsPlaying(!isPlaying);
    isPlaying
      ? audioRef.current.pause()
      : audioRef.current.play().catch((err) => {
          setIsPlaying(false);
        });
  }, [isPlaying]);

  //滑动时触发
  const sliderChange = useCallback(
    (value) => {
      setProgress(value);
      const time = ((value / 100.0) * duration) / 1000;
      setCurrentTime(time);
      setIsChanging(true);
    },
    [duration],
  );

  //滑动停止时触发
  const sliderAfterChange = useCallback(
    (value) => {
      const time = (value / 100.0) * duration;
      audioRef.current.currentTime = time;
      setCurrentTime(time);
      setIsChanging(false);

      if (!isPlaying) {
        play();
      }
    },
    [duration, isPlaying, play],
  );

  //点击句子时触发
  const clickSentence = (index) => {
    const lrcTime = currentLyrics[index];
    setCurrentTime(lrcTime / 1000);
    setProgress((lrcTime / 1000 / duration) * 100);
    audioRef.current.currentTime = lrcTime / 1000;
  };

  const timeUpdate = (value) => {
    const currentTime = value.target.currentTime;
    if (!isChanging) {
      setCurrentTime(currentTime);
      setProgress((currentTime / duration) * 100);
    }

    let lrcLength = currentLyrics.length;
    let i = 0;
    for (; i < lrcLength; i++) {
      const lrcTime = currentLyrics[i];
      if (currentTime * 1000 < lrcTime) {
        break;
      }
    }
    setFinalIndex(i - 1);
  };

  //每当active句子变化时，把该句子滚到屏幕中间
  useEffect(() => {
    let scrollElement = document.getElementById(`listen_sentence_${finalIndex}`);
    let textContainer = document.getElementById('textContainer');
    if (!scrollElement) return;
    //scrollTop被卷去部分的距离，offsetTop是当前active句子距离body顶部的距离（为什么是body，因为他是最近定位元素）
    textContainer.scrollTop = scrollElement?.offsetTop - 400;
  }, [finalIndex]);

  const timeEnded = () => {
    audioRef.current.currentTime = 0;
    play();
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     // audioRef.current.src = './2.mp3';
  //     audioRef.current.play();
  //   }, 1000);

  //   //   .then((res) => {
  //   //     setIsPlaying(true);
  //   //   })
  //   //   .catch((err) => {
  //   //     setIsPlaying(false);
  //   //   });
  //   // setDuration(currentSong.dt);
  // }, []);

  return (
    <div className={styles.container}>
      <audio ref={audioRef} src={audioSrc} onTimeUpdate={timeUpdate} onEnded={timeEnded} />
      <div className={styles.progress}>
        <PlayCircleFilled
          className={styles.playIcon}
          onClick={() => {
            play();
          }}
        />

        <div className={styles.slider}>
          <Slider value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} step={0.01} />
          <div className={styles.timeDetail}>
            <span>{formatMinuteSecond(currentTime * 1000)}</span>
            <span>05:41</span>
          </div>
        </div>

        <div className={styles.item}>1.0倍</div>

        <RetweetOutlined className={cls(styles.circleIcon, styles.item)} />
      </div>
      <div className={styles.radioGroup}>
        <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value='sentence'>音频点读</Radio.Button>
          <Radio.Button value='paragraph'>线索提示</Radio.Button>
        </Radio.Group>
      </div>
      {mode === 'sentence' && (
        <div className={styles.textContainer} id='textContainer'>
          {englishArr.map((_, index) => {
            return (
              <div
                id={`listen_sentence_${index}`}
                className={styles.textEngAndCh}
                onClick={() => {
                  clickSentence(index);
                }}>
                <div className={styles.textEnglish}>
                  <div
                    className={cls({ [styles.activeSentence]: index === finalIndex })}
                    dangerouslySetInnerHTML={{
                      __html: englishArr[index],
                    }}
                  />
                </div>
                <div className={styles.textChinese}>
                  <div
                    className={cls({ [styles.activeSentence]: index === finalIndex })}
                    dangerouslySetInnerHTML={{
                      __html: chineseArr[index],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {mode === 'paragraph' && (
        <div className={styles.textContainer} style={{ fontSize: '14px' }}>
          {englishClueArr.map((_, index) => {
            return (
              <div className={styles.textEngAndCh} style={{ marginBottom: '10px' }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: englishClueArr[index],
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: chineseClueArr[index],
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
