import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No songs yet',
  description = 'Start adding songs to your playlist',
}) => {
  const styles = getEmptyStateStyle();

  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
    </View>
  );
};

export default EmptyState;

const getEmptyStateStyle = () => {
  return StyleSheet.create({
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 8,
    },
    emptyDescription: {
      color: '#888',
      fontSize: 14,
      textAlign: 'center',
    },
  });
};