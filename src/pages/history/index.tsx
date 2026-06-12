import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { truthQuestions, dareChallenges } from '@/data/questions';
import styles from './index.module.scss';

interface HistoryItem {
  mode: 'truth' | 'dare';
  content: string;
  timestamp: number;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const savedHistory = Taro.getStorageSync('gameHistoryDetail');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('[History] Failed to parse history:', e);
      }
    }
  };

  const handleClearHistory = () => {
    Taro.showModal({
      title: '确认清空',
      content: '确定要清空所有历史记录吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.removeStorageSync('gameHistory');
          Taro.removeStorageSync('gameHistoryDetail');
          setHistory([]);
          Taro.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  };

  const truthCount = history.filter(h => h.mode === 'truth').length;
  const dareCount = history.filter(h => h.mode === 'dare').length;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}月${day}日 ${hours}:${minutes}`;
  };

  return (
    <View className={styles.pageContainer}>
      {/* 标题 */}
      <View className={styles.header}>
        <Text className={styles.title}>📝 历史记录</Text>
        {history.length > 0 && (
          <View className={styles.clearBtn} onClick={handleClearHistory}>
            <Text>清空</Text>
          </View>
        )}
      </View>

      {/* 统计 */}
      {history.length > 0 && (
        <View className={styles.stats}>
          <View className={styles.statCard}>
            <Text className={styles.statValue}>{truthCount}</Text>
            <Text className={styles.statLabel}>💬 真心话</Text>
          </View>
          <View className={styles.statCard}>
            <Text className={styles.statValue}>{dareCount}</Text>
            <Text className={styles.statLabel}>🎯 大冒险</Text>
          </View>
          <View className={styles.statCard}>
            <Text className={styles.statValue}>{history.length}</Text>
            <Text className={styles.statLabel}>📊 总计</Text>
          </View>
        </View>
      )}

      {/* 历史列表 */}
      <ScrollView scrollY className={styles.historyList} enableFlex>
        {history.length > 0 ? (
          [...history].reverse().map((item, index) => (
            <View key={`${item.timestamp}-${index}`} className={styles.historyCard}>
              <View className={styles.historyHeader}>
                <Text className={`${styles.type} ${styles[item.mode]}`}>
                  {item.mode === 'truth' ? '💬 真心话' : '🎯 大冒险'}
                </Text>
                <Text className={styles.time}>{formatTime(item.timestamp)}</Text>
              </View>
              <Text className={styles.historyContent}>{item.content}</Text>
            </View>
          ))
        ) : (
          <View className={styles.empty}>
            <Text className={styles.emptyIcon}>📭</Text>
            <Text className={styles.emptyText}>还没有游戏记录</Text>
            <Text className={styles.emptyTip}>去游戏页抽取题目吧</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HistoryPage;
