import React from 'react';
import { View, Text } from 'react-native';
import { getEmptyStateStyle } from '../styles/emptyState';
import { EmptyStateProps } from '@/types/components';

const EmptyState: React.FC<EmptyStateProps> = ({
  appTheme,
  title = 'No songs yet',
  description = 'Start adding songs to your playlist',
  isDark = false,
}) => {
  const styles = getEmptyStateStyle(appTheme);

  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
    </View>
  );
};

export default EmptyState;
