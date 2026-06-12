import React, { useState, useEffect } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getRandomTruth, getRandomDare } from '@/data/questions';
import styles from './index.module.scss';

type GameMode = 'truth' | 'dare' | null;

interface GameResult {
  mode: 'truth' | 'dare';
  content: string;
  id: number;
}

const IndexPage: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<GameMode>(null);
  const [currentResult, setCurrentResult] = useState<GameResult | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    // 从本地存储恢复历史记录
    const savedHistory = Taro.getStorageSync('gameHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('[Game] Failed to parse history:', e);
      }
    }
  }, []);

  const handleSelectMode = (mode: GameMode) => {
    setSelectedMode(mode);
    setCurrentResult(null);
  };

  const handleDraw = () => {
    if (!selectedMode) {
      Taro.showToast({
        title: '请先选择模式',
        icon: 'none'
      });
      return;
    }

    const excludeIds = history;
    let result;

    if (selectedMode === 'truth') {
      result = getRandomTruth(excludeIds);
    } else {
      result = getRandomDare(excludeIds);
    }

    if (!result) {
      Taro.showToast({
        title: '题目已抽完，重新开始吧',
        icon: 'none'
      });
      return;
    }

    const newResult: GameResult = {
      mode: selectedMode,
      content: selectedMode === 'truth' ? result.question : result.dare,
      id: result.id
    };

    setCurrentResult(newResult);

    // 更新历史记录
    const newHistory = [...history, result.id];
    setHistory(newHistory);
    Taro.setStorageSync('gameHistory', JSON.stringify(newHistory));

    // 震动反馈
    Taro.vibrateShort();
  };

  const handleNextRound = () => {
    setCurrentResult(null);
  };

  return (
    <View className={styles.pageContainer}>
      {/* 标题 */}
      <View className={styles.header}>
        <Text className={styles.title}>🎭 真心话大冒险</Text>
        <Text className={styles.subtitle}>选择你的命运吧！</Text>
      </View>

      {/* 模式选择 */}
      <View className={styles.modeSelection}>
        <View
          className={`${styles.modeCard} ${styles.truth} ${selectedMode === 'truth' ? styles.selected : ''}`}
          onClick={() => handleSelectMode('truth')}
        >
          <Text className={styles.modeEmoji}>💬</Text>
          <Text className={styles.modeName}>真心话</Text>
        </View>
        <View
          className={`${styles.modeCard} ${styles.dare} ${selectedMode === 'dare' ? styles.selected : ''}`}
          onClick={() => handleSelectMode('dare')}
        >
          <Text className={styles.modeEmoji}>🎯</Text>
          <Text className={styles.modeName}>大冒险</Text>
        </View>
      </View>

      {/* 抽取按钮 */}
      <Button
        className={`${styles.drawButton} ${!selectedMode ? styles.disabled : ''}`}
        onClick={handleDraw}
        disabled={!selectedMode}
      >
        🎲 {selectedMode ? '抽取 ' + (selectedMode === 'truth' ? '真心话' : '大冒险') : '请先选择模式'}
      </Button>

      {/* 结果展示 */}
      {currentResult && (
        <View className={styles.resultCard}>
          <Text className={`${styles.resultType} ${styles[currentResult.mode]}`}>
            {currentResult.mode === 'truth' ? '💬 真心话' : '🎯 大冒险'}
          </Text>
          <View className={styles.resultContent}>
            <Text>{currentResult.content}</Text>
          </View>
        </View>
      )}

      {/* 下一轮 */}
      {currentResult && (
        <Button className={styles.nextButton} onClick={handleNextRound}>
          🔄 下一轮
        </Button>
      )}

      {/* 提示 */}
      {!currentResult && (
        <Text className={styles.tip}>
          💡 提示：点击上方按钮抽取本局第 {history.length + 1} 题
        </Text>
      )}
    </View>
  );
};

export default IndexPage;
