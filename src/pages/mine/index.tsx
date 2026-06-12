import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { truthQuestions, dareChallenges } from '@/data/questions';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const [stats, setStats] = useState({
    totalGames: 0,
    truthCount: 0,
    dareCount: 0,
    questionCount: truthQuestions.length + dareChallenges.length
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const savedHistory = Taro.getStorageSync('gameHistoryDetail');
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        setStats({
          totalGames: history.length,
          truthCount: history.filter((h: any) => h.mode === 'truth').length,
          dareCount: history.filter((h: any) => h.mode === 'dare').length,
          questionCount: truthQuestions.length + dareChallenges.length
        });
      } catch (e) {
        console.error('[Mine] Failed to parse stats:', e);
      }
    }
  };

  const handleAbout = () => {
    Taro.showModal({
      title: '关于真心话大冒险',
      content: '一款经典的派对游戏！\n\n包含 50+ 道真心话问题\n包含 44+ 个大冒险挑战\n\n支持多种难度和分类',
      showCancel: false
    });
  };

  const handleHelp = () => {
    Taro.showModal({
      title: '游戏规则',
      content: '1. 选择真心话或大冒险\n2. 点击抽取按钮获取题目\n3. 按照题目要求完成挑战\n4. 查看历史记录回顾精彩瞬间\n\n注意：题目都是随机的，同一局不会出现重复题目哦！',
      showCancel: false
    });
  };

  return (
    <View className={styles.pageContainer}>
      {/* 头像 */}
      <View className={styles.header}>
        <View className={styles.avatar}>🎭</View>
        <Text className={styles.title}>真心话大冒险</Text>
        <Text className={styles.subtitle}>让派对更有趣</Text>
      </View>

      {/* 统计 */}
      <View className={styles.statsGrid}>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{stats.totalGames}</Text>
          <Text className={styles.statLabel}>游戏次数</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{stats.questionCount}</Text>
          <Text className={styles.statLabel}>题目总数</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{stats.truthCount}</Text>
          <Text className={styles.statLabel}>真心话次数</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statValue}>{stats.dareCount}</Text>
          <Text className={styles.statLabel}>大冒险次数</Text>
        </View>
      </View>

      {/* 菜单 */}
      <View className={styles.menuList}>
        <View className={styles.menuItem} onClick={handleHelp}>
          <View className={styles.menuLeft}>
            <Text className={styles.menuIcon}>❓</Text>
            <Text className={styles.menuLabel}>游戏规则</Text>
          </View>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View className={styles.menuItem} onClick={handleAbout}>
          <View className={styles.menuLeft}>
            <Text className={styles.menuIcon}>ℹ️</Text>
            <Text className={styles.menuLabel}>关于</Text>
          </View>
          <Text className={styles.menuArrow}>›</Text>
        </View>
      </View>

      {/* 底部 */}
      <View className={styles.footer}>
        <Text className={styles.version}>版本 1.0.0</Text>
        <Text className={styles.copyright}>© 2024 真心话大冒险</Text>
      </View>
    </View>
  );
};

export default MinePage;
