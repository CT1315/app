import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { truthQuestions, dareChallenges } from '@/data/questions';
import styles from './index.module.scss';

type TabType = 'all' | 'truth' | 'dare';

const QuestionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const getFilteredQuestions = () => {
    if (activeTab === 'all') {
      return [
        ...truthQuestions.map(q => ({ ...q, type: 'truth' as const, content: q.question })),
        ...dareChallenges.map(d => ({ ...d, type: 'dare' as const, content: d.dare }))
      ];
    }
    if (activeTab === 'truth') {
      return truthQuestions.map(q => ({ ...q, type: 'truth' as const, content: q.question }));
    }
    return dareChallenges.map(d => ({ ...d, type: 'dare' as const, content: d.dare }));
  };

  const questions = getFilteredQuestions();

  return (
    <View className={styles.pageContainer}>
      {/* 标题 */}
      <View className={styles.header}>
        <Text className={styles.title}>📚 题库</Text>
        <Text className={styles.subtitle}>共有 {questions.length} 道题目</Text>
      </View>

      {/* 标签页 */}
      <ScrollView scrollX className={styles.tabs} enableFlex>
        <View
          className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => setActiveTab('all')}
        >
          全部
        </View>
        <View
          className={`${styles.tab} ${activeTab === 'truth' ? styles.active : ''}`}
          onClick={() => setActiveTab('truth')}
        >
          真心话
        </View>
        <View
          className={`${styles.tab} ${activeTab === 'dare' ? styles.active : ''}`}
          onClick={() => setActiveTab('dare')}
        >
          大冒险
        </View>
      </ScrollView>

      {/* 问题列表 */}
      <ScrollView scrollY className={styles.questionList} enableFlex>
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <View key={`${q.type}-${q.id}-${index}`} className={styles.questionCard}>
              <Text className={styles.questionContent}>{q.content}</Text>
              <View className={styles.questionMeta}>
                <Text className={`${styles.tag} ${styles[q.type]}`}>
                  {q.type === 'truth' ? '💬 真心话' : '🎯 大冒险'}
                </Text>
                <Text className={`${styles.tag} ${styles[q.level]}`}>
                  {q.level === 'easy' ? '简单' : q.level === 'medium' ? '中等' : '困难'}
                </Text>
                <Text className={styles.category}>{q.category}</Text>
              </View>
            </View>
          ))
        ) : (
          <View className={styles.empty}>
            <Text className={styles.emptyText}>暂无题目</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default QuestionsPage;
