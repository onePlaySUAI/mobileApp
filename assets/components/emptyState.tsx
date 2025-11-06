import React from 'react';
import { View, Text } from 'react-native';
import { getEmptyStateStyle } from '../styles/emptyState';

interface EmptyStateProps {
  title?: string;
  description?: string;
  isDark?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No songs yet',
  description = 'Start adding songs to your playlist',
  isDark = false,
}) => {
  const styles = getEmptyStateStyle(isDark);

  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
    </View>
  );
};

export default EmptyState;
